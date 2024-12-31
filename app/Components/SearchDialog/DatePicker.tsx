"use client";
import * as React from "react";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/app/context/globalContext"; 

interface DatePickerProps {
  id?:string;
  message: string;
  type: "from" | "to";
  onChange: (date: string) => void; 
}

export function DatePicker({ message, type, onChange, id }: DatePickerProps) {
  const { fromDate, toDate, setFromDate, setToDate } = useGlobalContext();


  const initialDate = type === "from" ? moment(fromDate, "YYYY-MM-DD").toDate() : moment(toDate, "YYYY-MM-DD").toDate();
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD"); 
      console.log(`Selected ${type} Date (YYYY-MM-DD):`, formattedDate);
      if (type === "from") {
        setFromDate(formattedDate); 
      } else {
        setToDate(formattedDate);  
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          aria-label={`Select ${type === "from" ? "from" : "to"} date`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? moment(date).format("YYYY-MM-DD") : <span>{message}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
