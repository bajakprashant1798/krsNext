import Navbar from "@/components/Navbar";
import HeroFeatures from "@/components/home/HeroFeatures";
import TouchPanel from "@/components/home/TouchPanel";
import ScrollFeatures from "@/components/home/ScrollFeatures";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import GlobalPresence from "@/components/home/GlobalPresence";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden selection:bg-[var(--primary-color)] selection:text-white">
      <Navbar />
      <HeroFeatures />
      <TouchPanel />
      <ScrollFeatures />
      <HorizontalScroll />
      <GlobalPresence />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </main>
  );
}
