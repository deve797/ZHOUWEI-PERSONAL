import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Insights } from "@/components/Insights";
import { Gallery } from "@/components/Gallery";
import { WishBlessing } from "@/components/WishBlessing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Timeline />
      <Insights />
      <Gallery />
      <WishBlessing />
      <Footer />
    </main>
  );
}
