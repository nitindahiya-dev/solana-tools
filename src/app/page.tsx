import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import { TracingBeam } from "@/components/ui/tracing-beam";


export default function Home() {
  return (    
    <div className="flex justify-center flex-col max-w-7xl mx-auto">
      <TracingBeam>
      <Navbar />
      <Banner />
      <Services />
      <Faq />
      <Footer />
    </TracingBeam>
    </div>
  );
}
