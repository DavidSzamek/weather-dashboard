# The Weather Dashboard

## The Task

The aim of this project was to create a weather dashboard that will run in the browser and feature dynamically updating HTML and CSS. 

These website was created using the CSS framework bootstrap and powered using JavaScript, jQuery, moment.js & third-party APIs.

Third-party APIs allow developers to access data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. 

Using the [OpenWeather API] I was able to fetch weather data related to the users search input, the current forecast, temperature, wind speed and uv rating. 

Furthermore, using the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) I was able to fetch the 5 day forecast. 

## Difficulties 

This project brought together several concepts pertinent to third-party APIs. I struggled to maintain the best practice indentation with multiple functions running simultaneously. Furthermore, I was able to save the user search to a list group and localStorage; however, was unable to generate them on the page load or make previous user searches interactable. 

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for London.](/assets/images/function.png)

## The Deployed Website 

The application can be accessed using the following link: 

[Live website deployed here:](https://davidszamek.github.io/weather-dashboard/ "Weather Dashboard")

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
