import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef, useState } from "react";
import { BsFillArrowUpCircleFill, BsSearch } from 'react-icons/bs';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

function App() {

  const apiKey1 = "968f0f7254bd7afe8e223939ce9ff313";
  const baseUrl = "http://api.openweathermap.org/data/2.5/";


  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [bgImage, setBgImage] = useState('');

  const bgImageFunc = () => {
    if (data.weather) {
      const condition = data.weather[0].main;
      switch (condition) {
        case 'Clear':
          return setBgImage('/pics/bg-clear.jpg');
          break;
        case 'Mist':
          return setBgImage('/pics/bg-mist.jpg');
          break;
        case 'Haze':
          return setBgImage('/pics/bg-mist.jpg');
          break;
        case 'Clouds':
          return setBgImage('/pics/bg-clouds.jpg');
          break;
        case 'Rain':
          return setBgImage('/pics/bg-rainy.jpg');
          break;
        case 'Snow':
          return setBgImage('/pics/bg-snow.jpg');
          break;
        default:
          return setBgImage('');
          break;
      }
    }
  };



  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${baseUrl}weather?q=${query}&units=metric&appid=${apiKey1}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          setQuery("");
        });
    };

  }

  useEffect(bgImageFunc, [search]);


  const today = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];

    return `${day} , ${date} , ${month}`;
  }



  return (
    <div className="App">
      <div className="main-div" style={{
        backgroundImage: `url(${bgImage})`
      }}>
        <p className="currentDate fw-bold mx-2">Today : {today()}</p>
        <h2 className="header">Weather App</h2>
        <div>
          <div className="searchboxdiv">
            <input
              className="searchbox"
              type="text"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyDown={search}
            />
          </div>
        </div>
        {(typeof data.main != "undefined") ? (
          <div>
            <div>
              <div>
                <div className="content">
                  <div className="cityname">
                    {data.name} , {data.sys.country}
                  </div>
                  <div className="temperature">

                    <p className="minTemp"><BsFillArrowDownCircleFill /><small>min:</small> {Math.round(data.main.temp_min)}<span>&#8451;</span></p>
                    <p className="mainTemp">{Math.round(data.main.temp)}<span>&#8451;</span></p>
                    <p className="maxTemp"><BsFillArrowUpCircleFill /><small>max:</small> {Math.round(data.main.temp_max)}<span>&#8451;</span></p>

                  </div>
                  <div className="status">
                    <img className="conditionIcon" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].main} />
                    <h3 className="condition">{data.weather[0].main}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="first-text text-center fw-bold text-muted fs-1 my-5">
            search your favourite city to see the result
          </div>
        )}

        {data.cod === '404' ? (
          <div className="error text-center fw-bold text-warning fs-1 my-5">
            city not found!
          </div>
        ) :
          (<>
          </>)}
      </div >
    </div >
  );
}

export default App;
