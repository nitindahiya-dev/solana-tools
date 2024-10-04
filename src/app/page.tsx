import Banner from "@/components/Banner";
import { Connect } from "@/components/Connect";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="flex justify-center flex-col max-w-7xl mx-auto">
      <Navbar />
      <Banner />
      <Connect />
    </div>
  );
}
