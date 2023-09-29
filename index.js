const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const temperature = document.querySelector('.weather-box .temperature');

search.addEventListener('click', () => {

    const APIKey = '6c9676cf98ccabb0fccf37ff740afc31';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    let temp_type = "C";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            let cel_temp = parseInt(json.main.temp)
            const fahrenheit = (cel_temp * 9) / 5 + 32;

            if (temp_type === "C") {
                temperature.innerHTML = `${cel_temp}<span>°C</span>`;
            } else {
                temperature.innerHTML = `${fahrenheit}<span>F</span>`;
            }

            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            temperature.addEventListener("click", () => {
                if (temp_type === "C") {
                    temp_type = "F";
                    temperature.innerHTML = `${fahrenheit}<span>F</span>`;
                } else {
                    temp_type = "C";
                    temperature.innerHTML = `${cel_temp}<span>°C</span>`;
                }
            })

        });


});

window.addEventListener('load', () => {
    const APIKey = '6c9676cf98ccabb0fccf37ff740afc31';
    let long;
    let lat;
    let temp_type = "C";
    document.querySelector('.search-box input').value = "";
    // Accesing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing Longitude and Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`;

            // Using fetch to get data
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    if (json.cod === '404') {
                        container.style.height = '400px';
                        weatherBox.style.display = 'none';
                        weatherDetails.style.display = 'none';
                        error404.style.display = 'block';
                        error404.classList.add('fadeIn');
                        return;
                    }

                    error404.style.display = 'none';
                    error404.classList.remove('fadeIn');

                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');

                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'images/clear.png';
                            break;

                        case 'Rain':
                            image.src = 'images/rain.png';
                            break;

                        case 'Snow':
                            image.src = 'images/snow.png';
                            break;

                        case 'Clouds':
                            image.src = 'images/cloud.png';
                            break;

                        case 'Haze':
                            image.src = 'images/mist.png';
                            break;

                        default:
                            image.src = '';
                    }

                    let cel_temp = parseInt(json.main.temp)
                    const fahrenheit = (cel_temp * 9) / 5 + 32;

                    if (temp_type === "C") {
                        temperature.innerHTML = `${cel_temp}<span>°C</span>`;
                    } else {
                        temperature.innerHTML = `${fahrenheit}<span>F</span>`;
                    }

                    description.innerHTML = `${json.weather[0].description}`;
                    humidity.innerHTML = `${json.main.humidity}%`;
                    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                    weatherBox.style.display = '';
                    weatherDetails.style.display = '';
                    weatherBox.classList.add('fadeIn');
                    weatherDetails.classList.add('fadeIn');
                    container.style.height = '590px';

                    temperature.addEventListener("click", () => {
                        if (temp_type === "C") {
                            temp_type = "F";
                            temperature.innerHTML = `${fahrenheit}<span>F</span>`;
                        } else {
                            temp_type = "C";
                            temperature.innerHTML = `${cel_temp}<span>°C</span>`;
                        }
                    })
                });
        });
    }
});
