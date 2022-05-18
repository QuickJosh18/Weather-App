import './App.css';
import { useState } from 'react';
import Footer from './components/footer';

const api = {
  key: '427821e43ce66f04bbb1e5e817f2944d',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const bgWeather = (bgweath) => {
    if (typeof weather.main != "undefined") {
      if (weather.weather[0].main === 'Clear') return 'app warm'
      else if (weather.weather[0].main === 'Snow') return 'app snow'
      else if (weather.weather[0].main === 'Clouds') return 'app clouds'
      else if (weather.weather[0].main === 'Rain') return 'app rain'
      else if (weather.weather[0].main === 'Drizzle') return 'app drizzle'
      else if (weather.weather[0].main === 'Thunderstorm') return 'app thunderstorm'

    else return 'app'
    }
  }

  return (
    

    <div className = {(typeof weather.main != "undefined") ? bgWeather(weather.weather[0].main) : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className='search-bar'
            placeholder='Search..'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
      <Footer />
    </div>
  );
}

export default App;
