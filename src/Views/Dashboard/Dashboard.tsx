import { useState } from 'react';
import Body from '../../Layouts/body/Body';

import './Dashboard.css';
import Header from '../../Layouts/header/Header';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    lat: number | null;
    lon: number | null;
    angle: number | null;
    origin: string | null;
  } | null>(null);

  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);

  const [flight, setFlight] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(false);
  const [weatherInformation, setWeatherInformation] = useState<boolean>(false);

  const [visible, setVisible] = useState<string>('');

  const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(null);
  const [fly, setFly] = useState<boolean>(false);

  return (
    <div className="dashboard-wrapper">
      <Header
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setClickedLocation={setClickedLocation}
        setFlight={setFlight}
        setAlert={setAlert}
        setVisible={setVisible}
        visible={visible}
        flyToTarget={flyToTarget}
        setFlyToTarget={setFlyToTarget}
        clickedLocation={clickedLocation}
        setFly={setFly}
        setWeatherInformation={setWeatherInformation}
      />
      <div className="body-wrapper">
        <Body
          weatherInformation={weatherInformation}
          setWeatherInformation={setWeatherInformation}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          clickedLocation={clickedLocation}
          setClickedLocation={setClickedLocation}
          flight={flight}
          setFlight={setFlight}
          alert={alert}
          setAlert={setAlert}
          setVisible={setVisible}
          visible={visible}
          fly={fly}
          setFly={setFly}
          flyToTarget={flyToTarget}
          setFlyToTarget={setFlyToTarget}
        />
      </div>
    </div>
  );
}
