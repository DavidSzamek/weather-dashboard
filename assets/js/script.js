$(document).ready(function () {

})

// Global variables

// Search button 
var searchButton = $(".searchButton");
console.log(searchButton)


// Storing user input value 
var cityInputEl = $("#cityInput");


// API Key & URL 
var apiKey = "67db64e8f2042018691a996ccaac0a12";

var apiUrl

// Fetch open weather api 

function getWeather(event) {   
    event.preventDefault();

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.val() + "&units=metric&appid=" + apiKey;

    console.log("working?");

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // console.log(lat);
        // console.log(lon);

        // displayWeather(data, city);

       
    })
    
    // displayWeather();
}

var weatherEl = $("#current-weather-container");
var userSearchEl = $("#userSearch")

var displayWeather = function(weather, cityInputEl) {
    weatherEl.textContent="";
    userSearchEl.textContent=cityInputEl;

    console.log(weather);

    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("D MMM, YYYY") + ") ";
    userSearchEl.appendChild(currentDate);

}


searchButton.click(getWeather);
