$(document).ready(function () {
    var searchHistory = JSON.parse(localStorage.getItem("city"));

    if (searchHistory !== null) {
        var lastSearchIndex = searchHistory.length - 1; 
        var lastSearchCity = searchHistory(lastSearchIndex);
        getWeather(lastSearchCity);
        console.log('Last searched city: ${lastSearchCity}');
    }

})

// Global variables

var searchHistoryList = [];

// Search button 
var searchButton = $(".searchButton");
// console.log(searchButton)


// Storing user input value 
var cityInputEl = $("#cityInput");

// API Key & URL 
var apiKey = "67db64e8f2042018691a996ccaac0a12";

var apiUrl

// Fetch open weather api 

function getWeather(event) {   
    // event.preventDefault();

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.val() + "&units=metric&appid=" + apiKey;

    // console.log("test?");

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        // console.log(data.name);
        // console.log(data.main.temp);
        // console.log(data.weather[0].icon);
        // console.log(data.main.humidity);

        // for uv 
        // console.log(data.coord.lat)
        // console.log(data.coord.lon)

        // displayWeather(data, city);

       return data;
    })

    .then(function displayWeather(data) {

        // empty previous search container
        $("#weather-today").empty();

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
       
        

        var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey;

        fetch(uvUrl)
        .then(function (response) {
            return response.json()
        })
        .then (function (uvResponse) {

            // console.log(uvResponse);

            return uvResponse;

        })
        
        .then(function displayUV(uvResponse) {

            var uvIndex = uvResponse.current.uvi;
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
            // add uv to card
            var uvShow = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvShow.append($("<span>").attr("class", "uvIndex").attr("style", ("background-color:" + bgcolor)).text(uvIndex));
            cardBody.append(uvShow);
            // console.log(uvIndex);
        });

     // fetch 5 day future forecast 

     var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.val() + "&units=metric&appid=" + apiKey;
        
     forecastUrl = "https://cors-anywhere.herokuapp.com/" + forecastUrl;

     // console.log(forecastUrl);

     // empties forecast container
     $(".forecast").empty();

     
     fetch(forecastUrl)

     .then(function (response) {
         // console.log(response);
         return response.json();
     })
     .then (function (forecastData) {
         // console.log(forecastData)
         return forecastData
     })

     .then ( function (forecastData) {
         var futureForecast = $("<div>").attr("class", "forecast");
         $("#weather-today").append(futureForecast); 

         for (var i = 0; i < forecastData.list.length; i++) {
             if (forecastData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                 var forecastDay = $("<div>").attr("class", "one-fifth card text-white bg-success");
                 futureForecast.append(forecastDay);

                 var forecastCard = $("<div>").attr("class");
                 forecastDay.append(forecastCard);
                 
                 var forecastHead = $("<div>").attr("class", "card-header").text(moment(forecastData.list[i].dt, "X").format("ddd, MMM Do"));
                 forecastDay.append(forecastHead);

                 var forecastImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastData.list[i].weather[0].icon + "@2x.png");
                 forecastDay.append(forecastImg);

                 var forecastBody = $("<div>").attr("class", "card-body");
                 forecastDay.append(forecastBody);

                 forecastBody.append($("<p>").attr("class", "card-text").html("Temp: " + forecastData.list[i].main.temp + " °C"));
                 forecastBody.append($("<p>").attr("class", "card-text").text("Humidity: " + forecastData.list[i].main.humidity + "%"));
 
             }
         }
     })

    });
}

// function clear() {
//     $("weather-today").empty();
// }

// searchButton.click(getWeather);

// search button saves to localStorage

$(".searchButton").on("click", function(event) {
    event.preventDefault(); 

    var city = $("#cityInput").val().trim(); 
    getWeather(event); 
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city); 
        var searchedCities = $("<li class='list-group-item'>" + city + "</li>");
        $(".history").append(searchedCities);
    };
    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});

// create clickable list items to retrieve previous search history 

$(document).on("click", ".list-group-item", function() {
    var cityList = $(this).text(); 
    getWeather(cityList);
})

$(".clearButton").on("click", (event) => {
    localStorage.clear();
    
});
// 




