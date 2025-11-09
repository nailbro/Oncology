import Conferences from "@/shared/components/Conferences/Conferences";
import ConferencesTime from "@/shared/components/ConferencesTime/ConferencesTime";
import Hero from "@/shared/components/Hero/Hero";
import Maps from "@/shared/components/Maps/Maps";
import Mapsing from "@/shared/components/Mapsing/Mapsing";
import Possibilities from "@/shared/components/Possibilities/Possibilities";
import Reception from "@/shared/components/Reception/Reception";
import Schedule from "@/shared/components/Schedule/Schedule";
import Sponsors from "@/shared/components/Sponsors/Sponsors";
import Footer from "@/widgets/footer/Footer";
import Header from "@/widgets/header/Header";

export default function Home() {
  return (
    <>
<Header/>
<Hero/>
<Reception/>
<Conferences/>
<ConferencesTime/>
<Possibilities/>
<Schedule/>
<Sponsors/>
<Maps/>
<Mapsing/>
<Footer/>
    </>
  );
}
