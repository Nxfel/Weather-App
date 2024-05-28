document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search button');
    const themeToggle = document.querySelector('.theme-toggle');
    const searchInput = document.querySelector('.search input');
    const weatherInfo = document.querySelector('.weather-info');

    searchButton.addEventListener('click', () => {
        const city = searchInput.value;
        const apiKey = '96c32f8971cafbef625a9f78e1be2d65'; // Replace with your OpenWeatherMap API key

        // Geocoding API URL to get latitude and longitude for the city
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

        fetch(geocodingUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error('City not found');
                }

                const lat = data[0].lat;
                const lon = data[0].lon;

                // Weather API URL to get the weather data using the latitude and longitude
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                return fetch(weatherUrl);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                return response.json();
            })
            .then(data => {
                document.querySelector('.city-name').textContent = data.name;
                document.querySelector('.temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.querySelector('.description').textContent = `Forecast: ${data.weather[0].description}`;
                document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.querySelector('.wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
                weatherInfo.style.display = 'block';
            })
            .catch(error => {
                alert(error.message);
            });
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const themeToggle = document.querySelector('.theme-toggle');
        if (document.body.classList.contains('dark')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
});
