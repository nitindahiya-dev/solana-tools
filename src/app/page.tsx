import Banner from "@/components/Banner";
import { Connect } from "@/components/Connect";
import Faq from "@/components/Faq";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import { TracingBeam } from "@/components/ui/tracing-beam";


export default function Home() {
  return (
    
    <div className="flex justify-center flex-col max-w-7xl mx-auto">
      <TracingBeam>
      <Navbar />
      <Banner />
      {/* <Connect /> */}
      <Services />
      <Faq />
    </TracingBeam>
    </div>
  );
}
