"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { github } from "../utils/Icons";
import { ThemeDropDown } from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  
  const handleSearch = () => {
    // console.log("Searching with:", { latitude, longitude, startDate, endDate });

  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
      
        <SearchDialog
          // latitude={latitude}
          // longitude={longitude}
          // startDate={startDate}
          // endDate={endDate}
          // onLatitudeChange={setLatitude}
          // onLongitudeChange={setLongitude}
          // onStartDateChange={setStartDate}
          // onEndDateChange={setEndDate}
          // onSearch={handleSearch} 
        />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropDown />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
