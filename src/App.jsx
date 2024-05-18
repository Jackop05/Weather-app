import { useState } from 'react';



function App() {
  const [city, setCity] = useState('')
  const [ weather, setWeather ] = useState({ temp: 'X', city: 'X', windSpeed: 'X', humidity: 'X', condition: '' });

  const API_KEY = 'c58a5e9bf8e747ea8b184333241805';
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`

  const handleChange = (e) => {
    
    setCity(e.target.value);
  }

  const handleClick = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setWeather({ temp: data.current.temp_c, city: city, windSpeed: data.current.wind_kph, humidity: data.current.humidity, condition: data.current.condition.text })

    } catch (error) {
      console.log(error)
      setWeather({temp: 'X', city: 'No city found', windSpeed: 'X', humidity: 'X', condition: ''})
      alert("Error occured.\nCheck the date: after 1 July 2024 free trial is finished and app might not work properly.")
    }
  }

  const renderWeatherIcon = (weather) => {
    console.log(weather)
    switch (weather) {
      case 'Sunny':
      case 'Clear':
        return 'images/sun.png'

      case 'Partly cloudy':
        return 'images/clouds.png'

      case 'Cloudy':
      case 'Overcast':
      case 'Mist':
        return 'images/fog.png'

      case 'Patchy rain possible':
      case 'Light rain':
      case 'Heavy rain':
      case 'Moderate rain':
      case 'Sleet':
        return 'images/rain.png'

      case 'Thunderstorm':
        return 'images/storm.png'

      case 'Snow':
        return 'images/snow.png'

      default:
        return 'images/sun.png'
        break;
    }
  }


 

  return (
    <div className="app">
      <div className="w-[400px] sm:w-[480px]  bg-gradient-to-tl from-new-green to-new-blue p-10 rounded-[28px]">
        <div className="flex justify-center gap-4">
          <input 
            type="text" 
            placeholder="Enter city name" 
            spellCheck="false" 
            className="w-full max-w-[340px] h-10 rounded-3xl p-4 text-gray-800 font-bold text-sm outline-none" 
            onChange={handleChange}
            value={city}
          />
          <button 
            className="h-10 min-w-10 bg-white flex flex-col justify-center items-center rounded-full cursor-pointer transition-all hover:scale-105 hover:border-new-blue" 
            onClick={handleClick}
          >
            <img src="images/search.png" alt="search" width={20} height={20} />
          </button>
        </div>
        <img 
          src={renderWeatherIcon(weather.condition)} 
          alt="current weather"
          width={120} 
          height={120} 
          className="sm:mt-24 mt-16 mx-auto" 
        />
        <div className="sm:mt-16 mt-12 sm:text-7xl text-5xl font-bold text-center text-white">{weather.temp}°C</div>
        <div className="mt-4 sm:text-3xl text-2xl font-semi-bold text-center text-white">{weather.city}</div>
        <div className="flex flex-col justify-between sm:mt-20 mt-10 sm:flex-row">

          <div className="flex justify-center gap-4">
            <img src="images/humidity.png" alt="humidity" className="h-[70px] w-[70px]" />
            <div className="text-left flex flex-col justify-center">
              <div className="text-3xl text-white font-semibold">{weather.humidity}%</div>
              <div className="text-xl text-white">Humidity</div>
            </div>
          </div>


          <div className="sm:mt-0 mt-4 flex justify-center gap-4">
            <img src="images/wind.png" alt="wind speed" className="h-[60px] w-[60px]" />
            <div className="text-left flex flex-col justify-center">
              <div className="text-3xl text-white font-semibold">{weather.windSpeed} km/h</div>
              <div className="text-xl text-white">Wind Speed</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
