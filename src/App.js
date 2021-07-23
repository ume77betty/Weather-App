import { useEffect, useState, useCallback } from 'react';
import Header from './component/Header';
import InputArea from './component/InputArea';
import WeatherListArea from './component/WeatherListArea';
import BottomArea from './component/BottomArea';
import './App.css';

function App() {

  const [loading, setLoading] = useState();
  const [cityInput, setCityInput] = useState("");
  const [cityNotFound, setCityNotFound] = useState();
  const [city, setCity] = useState(localStorage.getItem('cityList') ? localStorage.getItem('cityList').split(',') : []);
  const [weatherData, setWeatherData] = useState([]);
  const [units, setUnits] = useState(`Metric`);

  const PARAMS = `ddc25a8b210ab01bba26befd30c70b9d`;
  const lang = `zh_tw`; //語言

  //確認city是否存在
  const tryNewCity = async () => {
    if (!cityInput) {
      return;
    } else {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&lang=${lang}&appid=${PARAMS}`);
      const newCityResponse = await response.json();
      if (newCityResponse.cod === '404') {
        setCityNotFound(true);
      } else {
        setCityNotFound(false);
        const nameUpperCase = (newCityResponse.name).toUpperCase();
        if (city.includes(nameUpperCase)) {
          let tempCity = city.filter(name => name !== nameUpperCase);
          tempCity.push(nameUpperCase);
          setCity(tempCity);
        } else {
          setCity((prev) => {
            return [
              ...prev,
              nameUpperCase
            ]
          })
        }
      }
      setCityInput("");
      setLoading(false);
    }
  }

  //更新所有city的資訊
  const fetchData = useCallback(() => {
    const fetchingWeather = async () => {
      setLoading(true);
      let tempData = [];
      for (const order of city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${order}&units=${units}&lang=${lang}&appid=${PARAMS}`);
        const data = await response.json();
        tempData.push(data);
      }
      setWeatherData(tempData);
      setLoading(false);
    }
    fetchingWeather();
  }, [PARAMS, city, lang, units])

  useEffect(() => {
    fetchData();
    localStorage.setItem('cityList', city);
  }, [fetchData, city])


  return (
    <>
      <div className="container">
        <Header />
        <InputArea
          cityInput={cityInput}
          tryNewCity={tryNewCity}
          cityNotFound={cityNotFound}
          setCityInput={setCityInput}
          setUnits={setUnits}
          setCityNotFound={setCityNotFound}
        />
        <WeatherListArea
          weatherData={weatherData}
          setCity={setCity}
        />
        <BottomArea
          loading={loading}
          fetchData={fetchData}
          setCity={setCity}
        />
      </div>
    </>
  );
}

export default App;
