export interface EarthquakeFeature {
  geometry: {
    coordinates: [number, number, number];
  };
  properties: {
    alert?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
export interface Props {
  selectedLocation: {
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
    origin: string | null;
  } | null;
  setSelectedLocation: (
    location: {
      id: string;
      lat: number | null;
      lon: number | null;
      angle: number | null;
      origin: string | null;
    } | null
  ) => void;
  flight: boolean;
  setFlight: (value: boolean) => void;
  clickedLocation: [number, number] | null;
  setClickedLocation: (location: [number, number] | null) => void;
  alert: boolean;
  setAlert: (value: boolean) => void;

  setVisible: (value: string) => void;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
  visible: string;

  flyToTarget?: [number, number] | null;
  fly?: boolean;
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
export type WeatherData = {
  weather: { description: string }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};
export type GeolocationData = {
  results: {
    formatted?: string;
    components?: {
      state?: string;
    };
    annotations?: {
      flag?: string;
    };
  }[];
};
