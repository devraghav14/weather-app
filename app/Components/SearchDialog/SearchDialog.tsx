"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { useGlobalContext } from '@/app/context/globalContext';
import { toast } from 'react-hot-toast';

function SearchDialog() {
  const {
    inputLong,
    inputLat,
    handleInputLat,
    handleInputLong,
    updateActiveCityCoords,
    setFromDate,
    setToDate,
    fromDate,
    toDate,
  } = useGlobalContext();

  const [localeFromDate, setLocalFromDate] = useState<string | null>(null);
  const [localeToDate, setLocalToDate] = useState<string | null>(null);

  const handleFromDateChange = (date: string) => {
    setLocalFromDate(date);
    setFromDate(date);
  };

  const handleToDateChange = (date: string) => {
    setLocalToDate(date);
    setToDate(date);
  };

  const validateLatLng = () => {
    let valid = true

    const lat = parseFloat(inputLat);
    const long = parseFloat(inputLong);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      valid=false;
      toast.error('Latitude must be a number between -90 and 90.');
      
    }

    
    if (isNaN(long) || long < -180 || long > 180) {
      valid=false;
      toast.error('Longitude must be a number between -180 and 180.');
     
    }

    return valid;
  };

  const validateDates = (fromDate: string | null, toDate: string | null): string | null => {
    if (!fromDate || !toDate) return "Both dates are required.";
  
    const from = new Date(fromDate);
    const to = new Date(toDate);
  
  
    if (to < from) {
      return "To date cannot be earlier than From date.";
    }
  
   
    const differenceInDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    if (differenceInDays > 10) {
      return "The date range cannot exceed 10 days.";
    }
  
    return null; 
  };

  const handleSearch = () => {
    const validationError = validateDates(fromDate, toDate);
    if (validationError) {
      toast.error(validationError);
      return;
    }

  
  
    if(validateLatLng()){
      updateActiveCityCoords();
    }
   
  };

 

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Search /> Search
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-full p-6">
          <DialogHeader>
            <DialogTitle>Search by Coordinates</DialogTitle>
            <DialogDescription>
              Search for specific coordinates
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            {/* Latitude Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="latitude" className="text-right">
                Latitude
              </Label>
              <div className="col-span-3">
                <Input
                  id="latitude"
                  className="rounded-md w-full border-gray-300"
                  placeholder="Latitude Value"
                  value={inputLat}
                  onChange={handleInputLat}
                />
              </div>
            </div>

            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longitude" className="text-right">
                Longitude
              </Label>
              <div className="col-span-3">
                <Input
                  id="longitude"
                  className="rounded-md w-full border-gray-300"
                  placeholder="Longitude Value"
                  value={inputLong}
                  onChange={handleInputLong}
                />
              </div>
            </div>

            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from-date" className="text-right">
                From Date
              </Label>
              <div className="col-span-3">
                <DatePicker
                  id="from-date"
                  type="from"
                  message="Pick the starting date"
                  onChange={handleFromDateChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to-date" className="text-right">
                To Date
              </Label>
              <div className="col-span-3">
                <DatePicker
                  id="to-date"
                  type="to"
                  message="Pick the end date"
                  onChange={handleToDateChange}
                />
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSearch}>
              Search
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;