import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Visibility } from "@/components/Visibility";
import { WhoItsFor } from "@/components/WhoItsFor";
import { FounderNote } from "@/components/FounderNote";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/lead/LeadModal";
import { StickyMobileCta } from "@/components/StickyMobileCta";

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
        <FounderNote />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
      <LeadModal />
      <StickyMobileCta />
    </>
  );
}
