export type SearchbarProps={
    
    setVisible: (value: string) => void
    setSelectedLocation: (
        location: {
          id: string;
          lat: number | null;
          lon: number | null;
          angle: number | null;
          origin: string | null;
        } | null
      ) => void;
      setFlight: (value: boolean) => void;
      setClickedLocation: (location: [number, number] | null) => void;
setWeatherInformation:(value:boolean)=>void;
   }