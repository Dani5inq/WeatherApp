const apiKey = "6a532f46cd4cf8cdf031d7d47413a8b8";

const weatherDataElement = document.getElementById("weather-data")

const cityInputElement = document.getElementById("city-input")

const formElement = document.querySelector("form")

formElement.addEventListener("submit", (event) => {
    event.preventDefault()
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue) 
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response Failure")
        }

        const data = await response.json()

        

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description 
        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,  
        ]

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`

        weatherDataElement.querySelector(".temperature").textContent = `${temperature}°C`

        weatherDataElement.querySelector(".description").textContent = `${description}`

        weatherDataElement.querySelector(".details").innerHTML = details.map(
            (detail) => `<div>${detail}</div>`
            ).join("");

    } catch (error) {
        weatherDataElement.querySelector(".icon").innerHTML = "";

        weatherDataElement.querySelector(".temperature").textContent = "";

        weatherDataElement.querySelector(".description").textContent = "Error! Please Check your Spelling or Make sure you filled in a correct city name";

        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}