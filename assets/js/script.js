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
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.weather[0].icon);
        console.log(data.main.humidity);

        // for uv 
        console.log(data.coord.lat)
        console.log(data.coord.lon)


        // displayWeather(data, city);

       return data;
    })

    .then(function displayWeather(data) {

        // create the current card
        var currentCard = $("<div>").attr("class", "card");
        $("#weather-today").append(currentCard);
    
        // add location
        var currentHeader = $("<div>").attr("class", "card-header").text("Current weather for " + data.name);
        currentCard.append(currentHeader);

        var cardRow = $("<div>").attr("class", "row");
        currentCard.append(cardRow);

        // add icon here

        var iconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

        var imgDiv = $("<div>").attr("class", "col-md-2").append($("<img>").attr("src", iconUrl).attr("class", "card-img"))
        currentCard.append(imgDiv);

        // console.log(iconUrl);
        // console.log(imgDiv);

        // card body 

        var cardBody = $("<div>").attr("class", "card-body");
        
        currentCard.append(cardBody);

        // temperature
        cardBody.append($("<p>").attr("class", "card-text").text("Temperature: " + data.main.temp + " °C"));
        
        // humidity
        cardBody.append($("<p>").attr("class", "card-text").text("Humidty: " + data.main.humidity + "%"));

        // windspeed
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + data.wind.speed + " km/h"));
       
        

        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lat + "&appid=" + apiKey;

        fetch(uvUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function (uvResponse) {

            console.log(uvResponse);

            return uvResponse;

        })
        
        .then(function displayUV(uvResponse) {

            var uvIndex = uvResponse.value
            var bgcolor; 
            if (uvIndex <= 3) {
                bgcolor = "green";
            }
            else if (uvIndex >= 3 || uvIndex <= 6) {
                bgcolor = "yellow";
            }
            else if (uvIndex >= 6 || uvIndex <= 8) {
                bgcolor = "orange";
            }
            else {
                bgcolor = "red";
            }
            // uv
            var uvShow = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvShow.append($("<span>").attr("class", "uvIndex").attr("style", ("background-color:" + bgcolor)).text(uvIndex));
            cardBody.append(uvShow);
            // console.log(uvIndex);

            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.val() + "&appid=" + apiKey;
        
            forecastUrl = "https://cors-anywhere.herokuapp.com/" + forecastUrl;

            console.log(forecastUrl);
            
            fetch(forecastUrl)

            .then(function (forecastData) {
                console.log(forecastData);
                return forecastData.json();

                
            })


        });

        

    });
}

// function clear() {
//     $("weather-today").empty();
// }

searchButton.click(getWeather);

