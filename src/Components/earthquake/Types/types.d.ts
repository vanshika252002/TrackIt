export interface EarthquakeProps {
   
    setStartTime:(value:string)=>void;
    setEndTime:(value:string)=>void;
    startTime:string|null;
    endTime:string|null;
    setAlert:(value:boolean)=>void;
   setClickedLocationEarthquake:(value:[number,number,string,number]|null)=>void;
   setVisible:(value:string)=>void;
   setFly:(value:boolean)=>void;
   setFlyToTarget:(value:[number,number]|null)=>void;
   visible:string;
   setClickedLocation:(value:[number,number]|null)=>void;
    
  }
 export  interface EarthquakeFeature {
  id: string;
    properties: {
      mag: number;
      place: string;
      time:number;
    };
    geometry: {
        coordinates: [number, number, number]; 
      };
  }