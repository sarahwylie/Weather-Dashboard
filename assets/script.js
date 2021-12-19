var cityBtn = document.querySelector(".city-btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#current-weather");
var forecast = document.querySelector("#forecast");
var storedCitiesBtn = document.querySelector("#stored");
const apiKey = "ab3299daa73e778a4f0c3bf18298f8d6";
// const input = cityInputEl.value;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`
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
            displayCurrentWeather(res, city);
            storeCity(res.name);
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
        fetchWeather();
    }
};

//get weather info from site
var fetchWeather = function (res) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    var lat = res.coord.lat;
    var lon = res.coord.lon;
    var city = res.name;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);
            renderWeather(city, res);
        });
};
    
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
    var uvi = res.uvi;

    // var uviEl = function(uvi) {
    //     uviEl = uvi.value 
    //     if (uvi.value <= 2) {
    //         uviElVal.classList = "favorable"
    //     } else if (uvi.value > 2 && uvi.value <= 8) {
    //         uviElVal.classList = "moderate"
    //     } else if (uvi.value > 8) {
    //         uviElVal.classList = "severe"
    //     }};

    var container = document.createElement("div");
    var body = document.createElement("div");
    var header = document.createElement("h2");
    var pdate = document.createElement("h3");
    var image = document.createElement("img")
    var ptemp = document.createElement("p");
    var pwind = document.createElement("p");
    var phumidity = document.createElement("p");
    var puvi = document.createElement("p");
    // uviEl() = document.createElement("btn");
    
    container.append(body);
    header.textContent = `${city}`
    pdate.textContent = `${new Date(date * 1000)}`
    
    var getIcon = res.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
    header.append(image);

    ptemp.textContent = `Temperature: ${temp + " °F"}`
    pwind.textContent = `Wind: ${wind + "  mph"}`
    phumidity.textContent = `Humidity: ${humidity + "  %"}`
    puvi.textContent = `UV Index: ${uvi}`

    body.append(header, pdate, ptemp, pwind, phumidity, puvi);
    weatherOutput.innerHTML = " ";
    weatherOutput.append(container);
};

//display future weather
var display5Day = function(day){
    forecast.textContent = ""

    var daily = day.list;
        for(var i=5; i < daily.length; i=i+8) {
       var dailyForecast = daily[i];

       //create date element
       var forecastDate = docuement.getElementById("fdate")
       forecastDate.textContent= `${new Date(date * 1000)}`
       forecast.appendChild(forecastDate);
       
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
    }
};

cityBtn.addEventListener("click", formSubmitHandler);
storedCitiesBtn.addEventListener("click", citySearchHandler);