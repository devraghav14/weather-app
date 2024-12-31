import moment from "moment-timezone";


export const airQulaityIndexText = [
    {
      rating: 10,
      description: "excellent",
    },
    {
      rating: 20,
      description: "good",
    },
    {
      rating: 30,
      description: "satisfactory",
    },
    {
      rating: 40,
      description: "fair",
    },
    {
      rating: 50,
      description: "moderate",
    },
    {
      rating: 60,
      description: "moderate",
    },
    {
      rating: 70,
      description: "poor",
    },
    {
      rating: 80,
      description: "poor",
    },
    {
      rating: 90,
      description: "very poor",
    },
    {
      rating: 100,
      description: "very poor",
    },
  ];

 

  export function convertToIST(isoTime: string): string {
    try {
      // Parse the ISO time and convert to IST
      const istTime = moment.utc(isoTime).tz("Asia/Kolkata");
  
      // Format as "HH:mm" (24-hour format, no seconds)
      return istTime.format("HH:mm");
    } catch (error: any) {
      return `Error: ${error.message}`;
    }
  }
