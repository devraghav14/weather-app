import LegacyTabs from "./Components/LegacyTabs";
import AirPollution from "./Components/AirPollution/AirPollution";
import Navbar from "./Components/Navbar";
import Temperature from "./Components/Temperature/Temperature";
import Sunset from "./Components/Sunset/Sunset";
import LegacyWinds from "./Components/LegacyWinds/Winds";
import Mapbox from "./Components/Mapbox/Mapbox";  // Import Mapbox directly

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
       
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <div className="instruments flex gap-2 h-full">
            <AirPollution />
            <Sunset />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
         
          <div className="flex-1 flex flex-col gap-4">
            <LegacyTabs />
            <Mapbox lat={28.7} lon={77.1} /> 
          </div>

          <div className="flex-1">
            <LegacyWinds />
          </div>
        </div>
      </div>
    </main>
  );
}
