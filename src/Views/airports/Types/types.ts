export interface Airport {
  setVisible: (value: string) => void;
  setOrigin: (value: string) => void;
  setWeatherInformation: (value: boolean) => void;
}
export interface Data {
  components: {
    country: string;
  };
  annotations: {
    flag: string;
  };
}
