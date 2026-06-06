import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { CaseStudies } from "@/components/CaseStudies";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Services />
        <Process />
        <CaseStudies />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
