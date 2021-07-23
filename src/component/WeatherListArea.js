const WeatherListArea = ({ weatherData, setCity }) => {

  const handleDelete = (cityName) => {
    const upperName = cityName.toUpperCase();
    setCity((prevCity) => prevCity.filter((city) => city !== upperName));
  }

  const demo = () => {
    let list = [];
    if (!weatherData) {
      return <div></div>;
    } else {
      for (let i = (weatherData.length - 1); i >= 0; i--) {
        list.push({
          cityName: weatherData[i].name,
          temp: weatherData[i].main.temp,
          humidity: weatherData[i].main.humidity,
          tempMax: weatherData[i].main.temp_max,
          tempMin: weatherData[i].main.temp_min,
          description: weatherData[i].weather[0].description
        });
      }
      const newArr = list.map((order, index) => {
        return (
          <div className="container border-bottom" key={index}>
            <div className="row line-height">
              <div className="col">
                {order.cityName}
              </div>
              <div className="col">
                {order.description}
              </div>
              <div className="col">
                {order.temp}
              </div>
              <div className="col">
                {order.tempMax}
              </div>
              <div className="col">
                {order.tempMin}
              </div>
              <div className="col">
                {order.humidity}%
              </div>
              <div className="col">
                <button className="delete-btn" onClick={() => handleDelete(order.cityName)}>Delete</button>
              </div>
            </div>
          </div>
        )
      })
      return newArr;
    }
  }

  return (
    <>
      <div className="container border-bottom">
        <div className="row">
          <div className="col">
            城市
          </div>
          <div className="col">
            天氣狀況
          </div>
          <div className="col">
            當前溫度
          </div>
          <div className="col">
            最高溫度
          </div>
          <div className="col">
            最低溫度
          </div>
          <div className="col">
            濕度
          </div>
          <div className="col">
            刪除
          </div>
        </div>
      </div>
      <div className="margin-bottom">{demo()}</div>
    </>
  )
}

export default WeatherListArea;