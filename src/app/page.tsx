import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Visibility } from "@/components/Visibility";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Assurances } from "@/components/Assurances";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Visibility />
        <WhoItsFor />
        <Assurances />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
