// script.js
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const apiKey = 'cb3312bc8681de2d48afccdb3fe493df';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weatherResult').innerHTML = `<p>Location not found. Please try again.</p>`;
            return;
        }

        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const weatherHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <img src="${weatherIcon}" alt="Weather icon" class="weather-icon">
            <table>
                <tr>
                    <th>Description</th>
                    <td class="weather-item"><i class="fas fa-cloud"></i>${data.weather[0].description}</td>
                </tr>
                <tr>
                    <th>Temperature</th>
                    <td class="weather-item"><i class="fas fa-thermometer-half"></i>${data.main.temp}°C</td>
                </tr>
                <tr>
                    <th>Feels Like</th>
                    <td class="weather-item"><i class="fas fa-temperature-high"></i>${data.main.feels_like}°C</td>
                </tr>
                <tr>
                    <th>Min Temperature</th>
                    <td class="weather-item"><i class="fas fa-temperature-low"></i>${data.main.temp_min}°C</td>
                </tr>
                <tr>
                    <th>Max Temperature</th>
                    <td class="weather-item"><i class="fas fa-temperature-high"></i>${data.main.temp_max}°C</td>
                </tr>
                <tr>
                    <th>Pressure</th>
                    <td class="weather-item"><i class="fas fa-tachometer-alt"></i>${data.main.pressure} hPa</td>
                </tr>
                <tr>
                    <th>Humidity</th>
                    <td class="weather-item"><i class="fas fa-tint"></i>${data.main.humidity}%</td>
                </tr>
                <tr>
                    <th>Wind Speed</th>
                    <td class="weather-item"><i class="fas fa-wind"></i>${data.wind.speed} m/s</td>
                </tr>
                <tr>
                    <th>Wind Direction</th>
                    <td class="weather-item"><i class="fas fa-compass"></i>${data.wind.deg}°</td>
                </tr>
                <tr>
                    <th>Cloudiness</th>
                    <td class="weather-item"><i class="fas fa-cloud"></i>${data.clouds.all}%</td>
                </tr>
                <tr>
                    <th>Sunrise</th>
                    <td class="weather-item"><i class="fas fa-sun"></i>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
                </tr>
                <tr>
                    <th>Sunset</th>
                    <td class="weather-item"><i class="fas fa-moon"></i>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
                </tr>
            </table>
        `;

        document.getElementById('weatherResult').innerHTML = weatherHTML;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = `<p>Sorry, something went wrong. Please try again later.</p>`;
    }
});
