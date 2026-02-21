export type Insight = {
  slug: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
};

export const insights: Insight[] = [
  {
    slug: "yoga-to-supply-chain",
    date: "2024-02-15",
    title: "From Yoga to Supply Chain: Finding Rhythm",
    category: "Business",
    excerpt:
      "The essence of supply chain is flow—and the wisdom of flow was learned in the breath. How do we find spaces to breathe among complex nodes?",
    content: [
      "There is a moment in every yoga practice when the breath and body finally stop fighting each other. The inhale lifts, the exhale releases, and suddenly the pose that felt impossible becomes—not easy, exactly, but possible. Sustainable. There is a rhythm to it that cannot be forced.",
      "I think about that moment often when I'm mapping out a supply chain. The language is different—lead times, SKU rationalization, vendor MOQs—but the underlying principle is the same. Flow cannot be forced. It has to be designed.",
      "When I first crossed from the studio to the warehouse floor, I brought the wrong tools. I brought urgency. I pushed on nodes that needed space, squeezed timelines that needed breath, and wondered why friction kept appearing in unexpected places. The system resisted me the way a body resists a pose it isn't ready for.",
      "The shift came when I started asking a different question. In yoga, we don't ask 'why won't my hip open?' We ask 'what is holding it closed?' The answer is almost never the hip itself—it's tension somewhere else in the chain. A tight IT band. A collapsed arch. A breath held three poses ago.",
      "Supply chains are the same. The stockout at the retail level is almost never caused by the retailer. It's tension held upstream—a supplier minimum that forced an over-order six months ago, a freight consolidation that made sense on paper but added three days of invisible waiting. The problem and its origin are rarely in the same place.",
      "What yoga gave me was a practice of tracing. Of following the thread of tension back to its source with patience, not panic. Of trusting that the system wants to flow—and that our job is to remove what's blocking it, not to push harder on what's already stuck.",
      "The supply chains I'm most proud of now are the ones that breathe. They have slack built into them—not waste, but deliberate space. Room for the unexpected freight delay, the sudden demand spike, the supplier who needs two extra days. Space is not inefficiency. Space is resilience.",
      "Finding rhythm in business, I've learned, is less about control and more about attunement. You have to listen to where the system is tight, where it wants to move, where it's holding its breath. And then you have to give it permission to exhale.",
    ],
  },
  {
    slug: "minimalism-real-business",
    date: "2024-01-20",
    title: "Minimalism & Real Business: The Art of Letting Go",
    category: "Growth",
    excerpt:
      "Unnecessary SKUs are like unnecessary emotions in life. Reduce the noise to reveal what truly matters.",
    content: [
      "The first product line I ever curated had forty-seven items. I was proud of it. Forty-seven felt comprehensive. It felt like I had thought of everything, covered every customer, left no need unmet. It felt, in short, like I knew what I was doing.",
      "Within six months, twelve of those forty-seven items accounted for over eighty percent of our revenue. The other thirty-five were costing us money—in storage, in attention, in the cognitive load of trying to manage complexity that wasn't earning its keep.",
      "I've come to think of this as the emotional inventory problem. We carry things—products, processes, habits, relationships—long past the point where they serve us, because letting go feels like admitting a mistake. Like saying that the version of ourselves who added them was wrong.",
      "But minimalism, real minimalism, isn't about judgment. It's about honesty. It's about looking at what you're carrying and asking, without defensiveness: does this still belong here?",
      "The SKU rationalization process I went through that year was one of the most clarifying experiences of my professional life. Not because we cut thirty-five products—though we did—but because of what the cutting revealed. It revealed our actual customer. The one who was choosing us, consistently, without prompting. The one whose problem we were genuinely solving.",
      "We had been so busy maintaining the illusion of comprehensiveness that we hadn't stopped to notice who was actually showing up.",
      "I apply this principle now to almost everything. To meetings. To metrics. To the stories I tell myself about why something isn't working. The question is always the same: what's really here, and what am I holding onto because I'm afraid to let it go?",
      "The art of letting go isn't emptiness. It's clarity. When you remove what doesn't belong, what remains becomes legible. You can finally see it, and tend to it, and grow it with intention.",
      "Forty-seven became twelve. Revenue grew. The team relaxed. And I learned something I've carried since: simplicity isn't the absence of effort. It's the result of it.",
    ],
  },
  {
    slug: "zero-to-one-challenge",
    date: "2023-12-05",
    title: "The 0 to 1 Challenge: Gentle Persistence",
    category: "Entrepreneurship",
    excerpt:
      "Resilience doesn't mean tension. In real retail, I've learned how to meet the toughest challenges with a gentle stance.",
    content: [
      "Everyone talks about resilience as if it's a kind of armor. Thick skin. The ability to absorb blows without flinching. I used to believe this. I trained for it. I tried to make myself harder.",
      "What I've learned, building from zero, is that hardness is actually a liability. The things that break in a business are almost always the things that couldn't flex.",
      "The 0 to 1 phase—that stretch between an idea and a first sustainable unit of business—is the most humbling thing I've ever done. Not because of the external obstacles, though those are real. But because of what it reveals about your relationship with uncertainty.",
      "I launched a product that I believed in completely. The first three months were silence. Not negative feedback—silence. No signal. I had built something and aimed it at a customer who hadn't arrived yet, and I had to decide, every single day, whether to keep going.",
      "The temptation in that silence is to tighten. To grasp. To pivot frantically toward any signal, any validation, any evidence that you haven't made a mistake. I did some of that. It didn't help.",
      "What helped was something I borrowed from my years on the mat: the practice of returning. In yoga, when you lose your balance, the instruction isn't 'never fall.' It's 'notice you've fallen, and return.' Without drama. Without self-recrimination. Just return.",
      "I started applying this to the business. When I made a decision that didn't work, I practiced noticing it clearly—what happened, why, what I'd do differently—and then returning to the work. Not carrying the weight of it forward. Not constructing a story about what it meant about me.",
      "Month four, a small retailer in Chengdu placed an order. Month five, two more. By month eight, we had enough signal to understand our actual customer, and the business started to breathe.",
      "Gentle persistence isn't passive. It's one of the most active stances I know. It requires constant choice—the choice to keep showing up, to keep learning, to keep returning—without the adrenaline of urgency or the armor of false certainty.",
      "The 0 to 1 journey doesn't reward the hardest. It rewards the ones who can stay soft enough to learn, and steady enough to continue.",
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}
