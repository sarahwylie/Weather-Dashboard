var cityBtn = document.querySelector(".city-btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var storedCitiesBtn = document.querySelector("#stored");
const apiKey = "ab3299daa73e778a4f0c3bf18298f8d6";
var history = [];

//form submit
var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();
    if (city) {
        getCity(city);
        //clear old content from form input
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
    storeCity();
    retrieveCity(city);
};

//find current city data
var getCity = function (city) {
    //weather api url
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        }) .then(function (res) {
            console.log(res);
            // fetchUvi();
            displayCurrentWeather(res, city);
            storeCity(res.name);
            get5Day();
        })
};

//post city to button list
var retrieveCity = function (retrieveCity) {
    console.log("retrieve", retrieveCity)
    searchesEl = document.createElement("button");
    searchesEl.textContent = retrieveCity;
    searchesEl.classList = "d-flex w-100 btn border p-2";
    searchesEl.setAttribute("cityData", retrieveCity)
    searchesEl.setAttribute("type", "submit");
    storedCitiesBtn.prepend(searchesEl);
};

//add city to stored list
var storeCity = function () {
    localStorage.setItem("searchHistory", JSON.stringify(history));
};

//stored cities button
var citySearchHandler = function (event) {
    var city = event.target.getAttribute("cityData")
    if (city) {
        fetchUvi();
    }
};

// //get uvi info
// var fetchUvi = function (lat, lon) {
//     var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//     // var lat = response.coord.lat;
//     // var lon = response.coord.lon;
//     // var city = response.main.name;
//     fetch(apiUrl)
//         .then(function (response) {
//              return response.json();
//         })  .then(function (res) {
//             console.log(res);
//             displayUvi(res);
//         });
// };

// var displayUvi = function(uvi) {
//     var uviEl = document.createElement("btn");
//     uviEl.textContent = `UV Index: `
//         uviEl = uvi.value 
//         if (uvi.value <= 2) {
//             uviElVal.classList = "favorable"
//         } else if (uvi.value > 2 && uvi.value <= 8) {
//             uviElVal.classList = "moderate"
//         } else if (uvi.value > 8) {
//             uviElVal.classList = "severe"
//         }};
    
var renderWeather = function (city, data) {
    displayCurrentWeather(city, data.current, data.timezone);
    display5Day();
};

//Display the current weather
var displayCurrentWeather = function (res) {
    weatherOutput.textContent = "";

    var city = res.name;
    var date = res.dt;
    var temp = res.main.temp;
    var wind = res.wind.speed;
    var humidity = res.main.humidity;

    var container = document.createElement("div");
    var body = document.createElement("div");
    var header = document.createElement("h2");
    var pdate = document.createElement("h3");
    var image = document.createElement("img")
    var ptemp = document.createElement("p");
    var pwind = document.createElement("p");
    var phumidity = document.createElement("p");
    
    container.append(body);
    header.textContent = `${city}`
    pdate.textContent = `${new Date(date * 1000)}`
    
    var getIcon = res.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
    header.append(image);

    ptemp.textContent = `Temperature: ${temp + " °F"}`
    pwind.textContent = `Wind: ${wind + "  mph"}`
    phumidity.textContent = `Humidity: ${humidity + "  %"}`

    body.append(header, pdate, ptemp, pwind, phumidity);
    weatherOutput.innerHTML = " ";
    weatherOutput.append(container);
};

var get5Day = function(city) {
    var fapiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    console.log(fapiUrl)
    fetch(fapiUrl)
        .then(function (response) {
            return response.json();
        }) .then(function (res) {
            console.log(res);
            display5Day(res);
    });
};

//display future weather
var display5Day = function(res){
    forecastEl.textContent = ""
console.log("response", res)
    var date1 = res.list[0].dt;
    // var forecast = weather;
    //     for (var i=0; i < 5; i++) {
    //    var dailyForecast = forecast[i];
    //         console.log(dailyForecast);

       //date1 element
       var fdate1 = document.querySelector("fdate1")
       fdate1.textContent= `${new Date(date1 * 1000)}`
       forecast.appendChild(fdate1);
       
       //create an image element
       var weatherIcon = document.geteElementById("fimg")
       img.src = `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`;  
       forecast.appendChild(weatherIcon);
       
       //create temperature element
       var forecastTempEl = document.getElementById("ftemp");
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";
       forecast.appendChild(forecastTempEl);

       var forecastHumEl=document.getElementById("fhum");
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
       forecast.appendChild(forecastHumEl);
       forecastContainerEl.appendChild(forecast);
};

cityBtn.addEventListener("click", formSubmitHandler);
storedCitiesBtn.addEventListener("click", citySearchHandler);