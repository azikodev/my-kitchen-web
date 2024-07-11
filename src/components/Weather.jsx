import React, { useEffect, useState } from "react";

const API_KEY = "39a2bcf93a5e2cc9bbf3119ffc0fb61a";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            getWeather(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolokatsiya brauzeringizda qo'llab-quvvatlanmaydi.");
      }
    };

    const getWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Ob-havo ma'lumotlarini olishda xatolik yuz berdi.");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {error ? (
        <div id="weather">{error}</div>
      ) : weather ? (
        <div id="weather" className="flex items-center justify-center">
          <div className="font-[600] text-[16px]">{weather.name}</div>: {weather.main?.temp}°C
          <br />
          <div className="w-[40px] h-[40px] overflow-hidden">
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ) : (
        <div id="weather">Yuklanmoqda...</div>
      )}
    </div>
  );
};

export default Weather;
