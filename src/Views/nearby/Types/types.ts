export interface NearbyFlight {
  id: string;
  lat: number;
  lon: number;
  distance: number;
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
];

export interface NearbyProps {
  selectedLocation: {
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
  } | null;
  setWeatherInformation: (value: boolean) => void;
  setVisible: (value: string) => void;
  setFlight: (value: boolean) => void;
  setSelectedLocation: (
    location: {
      lat: number;
      lon: number;
      id: string;
      angle: number;
      origin: string;
    } | null
  ) => void;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
  setClickedLocation: (location: [number, number] | null) => void;
}
