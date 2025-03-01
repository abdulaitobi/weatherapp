const body = document.querySelector('body');
const img = document.querySelector('img');
const city = document.getElementById('city');
const conditions = document.getElementById('conditions');
const temperature = document.getElementById('temperature'); 
const button = document.getElementById('search-icon');
let input = document.querySelector('input'); 
const unitChanger = document.getElementById('unitChanger');
let currentTempF;
button.addEventListener('click', getWeatherInfo)

async function getWeatherInfo() {
    try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + input.value + '?key=NB3KFUAAJZ3CXF2ZP7FQ6QFTN', {mode: 'cors'})
        const weatherData = await response.json();
        if (weatherData.address === null){
            alert ('City was not found');
            return;
        }
        else{
            city.innerHTML = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            conditions.innerHTML = "Its looking " + weatherData.currentConditions.conditions + " right now";
            temperature.innerHTML = "The temperature is " + weatherData.currentConditions.temp + " °F";
            // Store the current temperature
            currentTempF = weatherData.currentConditions.temp;
            updateTemp();

            if (weatherData.currentConditions.conditions === 'Clear'){
                img.src = 'Clear.gif';
                body.style.backgroundColor = 'skyblue';
            }
            else if (weatherData.currentConditions.conditions === 'Rain, Partially cloudy'){
                img.src = 'Rainpartiallycloudy.gif';
                body.style.backgroundColor = 'darkgray';
            }
            else if (weatherData.currentConditions.conditions === 'Cloudy'){
                img.src = 'images/cloudy.png';
                body.style.backgroundColor = 'gray';
            }
            else if (weatherData.currentConditions.conditions === 'Partially cloudy'){
                img.src = 'Partiallycloudy.gif';
                body.style.backgroundColor = 'lightgray';
            }
            else if (weatherData.currentConditions.conditions === 'Snow, Overcast'){
                img.src = 'Snowovercast.gif';
                body.style.backgroundColor = 'white';
            }
            else if (weatherData.currentConditions.conditions === 'Thunderstorms'){
                img.src = 'images/thunderstorms.png';
                body.style.backgroundColor = 'black';
            }
            else if (weatherData.currentConditions.conditions === 'Fog'){
                img.src = 'images/fog.png';
                body.style.backgroundColor = 'lightgray';
            }
            else if (weatherData.currentConditions.conditions === 'Overcast'){
                img.src = 'Overcast.gif';
                body.style.backgroundColor = 'gray';
            }
        }
    }
    catch(error) {
        alert ('City was not found');
    };
};

unitChanger.addEventListener('click', function() {
    if (unitChanger.innerHTML === "°F") {
        unitChanger.innerHTML = "°C";
    } else {
        unitChanger.innerHTML = "°F";
    }
    updateTemp();
});

function updateTemp() {
    const isCurrentlyFahrenheit = unitChanger.innerHTML === "°F";
        
    if (isCurrentlyFahrenheit) {
        temperature.innerHTML = "The temperature is " + currentTempF + " °F";
    } else {
        const tempC = Math.round(((currentTempF - 32) * 5/9) * 10) / 10;
        temperature.innerHTML = "The temperature is " + tempC + " °C";
    }
}

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=NB3KFUAAJZ3CXF2ZP7FQ6QFTN', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });
