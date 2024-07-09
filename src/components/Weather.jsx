import React, { useEffect, useState } from "react";

const API_KEY = "39a2bcf93a5e2cc9bbf3119ffc0fb61a";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
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

    const getWeather = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Ob-havo ma'lumotlarini olishda xatolik yuz berdi."
            );
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    };

    getLocation();
  }, []);

  return (
    <div>
      {error ? (
        <div id="weather">{error}</div>
      ) : weather ? (
        <div id="weather" className="flex items-center justify-center">
          <div className="font-[600]">{weather.name}</div>: {weather.main?.temp}
          °C
          <br />
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-[40px] h-[30px]"
          />
        </div>
      ) : (
        <div id="weather">Yuklanmoqda...</div>
      )}
    </div>
  );
};

export default Weather;
