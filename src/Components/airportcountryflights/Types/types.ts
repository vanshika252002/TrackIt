export interface AirportCountryFlightsProps {
  origin: string;
  setVisible: (value: string) => void;
  setSelectedLocation: any;
  setFlight: any;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
  setClickedLocation: (location: [number, number] | null) => void;
  selectedLocation: {
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
  } | null;
}
export type Details = [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  boolean,
  number,
  number,
];
