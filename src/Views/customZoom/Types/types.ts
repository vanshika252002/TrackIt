export interface Props{
    chooseOption:{flight:{setFlight:(value:boolean)=>void,flight:boolean};
    earthquake:{setAlert:(value:boolean)=>void,alert:boolean};
    visibility: {
      setVisible: (value: string) => void
    }
    
  }
  weatherInformation:boolean,
  setWeatherInformation:(value:boolean)=>void
  setClickedLocation: (location: [number, number] | null) => void;
  setSelectedLocation: (
    location: {
      id: string;
      lat: number | null;
      lon: number | null;
      angle: number | null;
      origin: string | null;
    } | null
  ) => void;
  }