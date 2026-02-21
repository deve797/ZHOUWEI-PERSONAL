import { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return Response.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    if (username !== validUsername || password !== validPassword) {
      return Response.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    const response = Response.json({ ok: true });
    const headers = new Headers(response.headers);
    headers.set(
      "Set-Cookie",
      `${SESSION_COOKIE}=${SESSION_VALUE}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`
    );

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
