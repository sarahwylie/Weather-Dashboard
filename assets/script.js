var cityBtn = document.querySelector(".btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#weather-container");
var city
var cityWeather 

var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value from input element
    city = cityInputEl.value.trim();

    if (city) {
        getCity(city);

        //clear old content from form input
        // weatherOutput.value = "";
        cityInputEl.value = "";

    } else {
        alert("Please enter a city");
    }
};

//access 
var getCity = function (city) {
    // event.preventDefault();
    //weather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial";
console.log(apiUrl)
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrentWeather(data);
   //Save the city to local storage
            var captureData = $(this).siblings(".form-input").val()
            localStorage.setItem(cityInputEl);
                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather service");
        });
};

//add city to stored list
var storeCity = function() {
    $("#stored .form-input").val(localStorage.getItem("stored"))
};

//Display the current weather
var displayCurrentWeather = function (nugz) {
    console.log(nugz)

    var currentForecast = nugz.list[0];
    console.log(currentForecast)

    var forecast = currentForecast.weather[0];
    console.log("forecast", forecast)

    //openweathermap.org/img/w/04d
    var getIcon = currentForecast.weather[0].icon;
    var image = document.createElement("img")
    image.src = "https://openweathermap.org/img/w/" + getIcon +".png"
    console.log("image", image);
            //append to container
        image.appendChild(weatherOutput);
};

// var displayWeatherCurrent = function (nugz) {
//     console.log(nugz)
//             //clear old content from weather data
//             weatherOutput.textContent = "";
//     // check on data returned by API
//     if (nugz.length === 0) {
//         weatherOutput.textContent = "No weather found";
//         return;
//     }
//     //loop over data
//     for (var i = 0; i < nugz.list.length; i++) {
//         //format data name
//         var cityName = nugz[i];
// console.log(cityName)
//         //create a container for each city
//         var cityEl = document.createElement("a");
//         cityEl.classList = "list-item flex-row justify-space-between align-center";
//         cityEl.setAttribute("href", "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ab3299daa73e778a4f0c3bf18298f8d6")

//         //create a span element to hold city names
//         var titleEl = document.createElement("span");
//         titleEl.textContent = cityName;

//         //append to container
//         cityEl.appendChild(titleEl);

//         //create a status element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center";

//         //retrieve weather for specific city
//         statusEl.innerHTML = cityEl;

//         //append to container
//         // cityEl.appendChild(retrieveWeather);
//         // cityEl.appendChild(weatherOutput);

//         //append container to the dom
//         weatherOutput.appendChild(cityEl);
//     }
// };

cityBtn.addEventListener("click", formSubmitHandler);