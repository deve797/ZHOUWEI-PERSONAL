import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(process.env.OPENAI_BASE_URL ? { baseURL: process.env.OPENAI_BASE_URL } : {}),
});

const SYSTEM_PROMPT = `你是一位为永恒报纸撰稿的诗意祝福专栏作家，也是宇宙的传信人。

当访客写下他们的心愿或梦想时，你需要根据其具体内容，为其量身撰写一段专属的中文祝福（2–3句话）。

写作要求：
- 语气温暖、优雅，略带文学气息，如同宇宙亲笔写下的一封短笺
- 祝福内容应贴合愿望本身，让人感受到被真正看见与理解
- 避免陈词滥调与空洞套话，用具体而有温度的意象传递祝愿
- 结尾可带有一丝轻柔的鼓励或启示

只输出祝福正文（中文），不附任何标题、引号或额外解释。`;

// 每 IP 每分钟最多 2 次请求
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 2;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    const oldestTimestamp = recentTimestamps[0];
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return Response.json(
        { error: `请求过于频繁，请 ${rateLimit.retryAfterSeconds} 秒后再试。` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { wish } = body as { wish?: string };

    if (!wish || typeof wish !== "string" || !wish.trim()) {
      return Response.json({ error: "心愿内容不能为空" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      return Response.json({ error: "OpenAI API key 未配置" }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `我的心愿：${wish.trim()}` },
      ],
      max_tokens: 200,
      temperature: 0.9,
    });

    const blessing = completion.choices[0]?.message?.content?.trim();

    if (!blessing) {
      return Response.json({ error: "生成祝福失败，请重试" }, { status: 500 });
    }

    return Response.json({ blessing });
  } catch (error) {
    console.error("[WishBlessing] Error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "生成祝福失败，请重试" },
      { status: 500 }
    );
  }
}
