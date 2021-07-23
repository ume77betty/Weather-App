const InputArea = ({
  cityInput,
  setCityInput,
  tryNewCity,
  cityNotFound,
  setCityNotFound,
  setUnits
}) => {

  const handleChange = (e) => {
    setCityInput((e.target.value).trim());
    setCityNotFound(false);
  }

  const handleUnits = (e) => {
    setUnits(e);
  }

  return (
    <>
      <div className="input-group mb-3 w-75 p-3">
        <input type="text" className="form-control" placeholder="請輸入城市名稱" aria-label="City Name" aria-describedby="button-addon2" value={cityInput} onChange={handleChange}></input>
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={tryNewCity}>Get Weather</button>
      </div>
      <div className="margin-bottom">
        <span>請選擇溫度單位</span>
        <div className="form-check" onChange={(e) => handleUnits(`metric`)}>
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked></input>
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            攝氏度（°C）
          </label>
        </div>
        <div className="form-check" onChange={(e) => handleUnits(`Imperial`)}>
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"></input>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            華氏度（°F）
          </label>
        </div>
      </div>
      <div className="margin-bottom">
        {cityNotFound ? <div className="alert alert-danger" role="alert">找不到該城市</div> : ''}
      </div>

    </>
  )
}

export default InputArea;