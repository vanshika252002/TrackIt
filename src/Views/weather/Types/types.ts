export interface Weatherprops {
  setVisible: (value: string) => void;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
  clickedLocation: [number, number] | null;
  setClickedLocation: (location: [number, number] | null) => void;
  setWeatherInformation:(value:boolean)=>void
}
