export interface Props {
  setFlight: (value: boolean) => void;
  selectedLocation: {
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
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
  setClickedLocation: (location: [number, number] | null) => void;
  setAlert: (value: boolean) => void;
  setWeatherInformation: (value: boolean) => void;

  clickedLocation: any;

  setVisible: (value: string) => void;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
  visible: string;

  flyToTarget: [number, number] | null;
}
