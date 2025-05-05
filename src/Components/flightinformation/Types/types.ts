export interface FlightDetail {
  icao24: string;
  callSign: string;
  originCountry: string;
  timePosition: number;
  lastContact: number;
  latitude: number;
  longitude: number;
  baroAltitude: number;
  onGround: boolean;
  velocity: number;
  angle: number;
}

export interface FlightInformationProps {
  selectedLocation: {
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
  } | null;
  origin: string;
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
