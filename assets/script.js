var cityBtn = document.querySelector(".city-btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var Day1 = document.querySelector("#day-1");
var Day2 = document.querySelector("#day-2");
var Day3 = document.querySelector("#day-3");
var Day4 = document.querySelector("#day-4");
var Day5 = document.querySelector("#day-5");
var C1 = document.querySelector(".card-body-1");
var C2 = document.querySelector(".card-body-2");
var C3 = document.querySelector(".card-body-3");
var C4 = document.querySelector(".card-body-4");
var C5 = document.querySelector(".card-body-5");
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
        }).then(function (res) {
            console.log(res);
            fetchAllWeather(res);
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
    searchesEl.setAttribute("value", retrieveCity)
    searchesEl.setAttribute("type", "submit");
    storedCitiesBtn.prepend(searchesEl);
};

//add city to stored list
var storeCity = function () {
    localStorage.setItem("searchHistory", JSON.stringify(history));
};

//stored cities button
var citySearchHandler = function (event) {
    var btn = event.target
    var search = btn.getAttribute("value")
    //clear old content from form input
    C1.textContent = "";
    C2.textContent = "";
    C3.textContent = "";
    C4.textContent = "";
    C5.textContent = "";
    getCity(search);
};

//get uvi info
var fetchAllWeather = function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var city = response.main.name;
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        }).then(function (res) {
            console.log(res);
            displayUvi(res);
            display5Day(res);
        });
};

var displayUvi = function (res) {
    var uvi = res.current.uvi
    var uviEl = document.createElement("btn");
    uviEl.textContent = `UV Index: ${uvi}`
    console.log(uvi)
    if (uvi <= 2) {
        uviEl.setAttribute("class", "favorable")
    } else if (uvi > 2 && uvi <= 8) {
        uviEl.setAttribute("class", "moderate")
    } else if (uvi > 8) {
        uviEl.setAttribute("class", "severe")
    }
    weatherOutput.append(uviEl)
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

//display future weather
var display5Day = function (res) {

    // forecastEl.textContent = ""
    console.log("response", res)
    // var forecast = weather;
    //     for (var i=0; i < 5; i++) {
    //    var dailyForecast = forecast[i];
    //         console.log(dailyForecast);

    //date1 element
    var date1 = res.daily[1].dt;
    Day1.textContent = `${new Date(date1 * 1000).toLocaleDateString("en-US")}`

    //date2 element
    var date2 = res.daily[2].dt;
    Day2.textContent = `${new Date(date2 * 1000).toLocaleDateString("en-US")}`

    //date3 element
    var date3 = res.daily[3].dt;
    Day3.textContent = `${new Date(date3 * 1000).toLocaleDateString("en-US")}`

    //date4 element
    var date4 = res.daily[4].dt;
    Day4.textContent = `${new Date(date4 * 1000).toLocaleDateString("en-US")}`

    //date5 element
    var date5 = res.daily[5].dt;
    Day5.textContent = `${new Date(date5 * 1000).toLocaleDateString("en-US")}`

    //create an image element
    var img1 = res.daily[1].weather[0].icon;
    var fimg1 = document.createElement("img");
    fimg1.src = `https://openweathermap.org/img/wn/${img1}.png`
    C1.append(fimg1);

    var img2 = res.daily[2].weather[0].icon;
    var fimg2 = document.createElement("img");
    fimg2.src = `https://openweathermap.org/img/wn/${img2}.png`
    C2.append(fimg2);

    var img3 = res.daily[3].weather[0].icon;
    var fimg3 = document.createElement("img");
    fimg3.src = `https://openweathermap.org/img/wn/${img3}.png`
    C3.append(fimg3);

    var img4 = res.daily[4].weather[0].icon;
    var fimg4 = document.createElement("img");
    fimg4.src = `https://openweathermap.org/img/wn/${img4}.png`
    C4.append(fimg4);

    var img5 = res.daily[5].weather[0].icon;
    var fimg5 = document.createElement("img");
    fimg5.src = `https://openweathermap.org/img/wn/${img5}.png`
    C5.append(fimg5);

    //create temperature element
    var temp1 = res.daily[1].temp.day;
    var ftemp1 = document.createElement("p");
    C1.append(ftemp1);
    ftemp1.textContent = `Temperature: ${temp1 + " °F"}`;

    var temp2 = res.daily[2].temp.day;
    var ftemp2 = document.createElement("p");
    C2.append(ftemp2);
    ftemp2.textContent = `Temperature: ${temp2 + " °F"}`;

    var temp3 = res.daily[3].temp.day;
    var ftemp3 = document.createElement("p");
    C3.append(ftemp3);
    ftemp3.textContent = `Temperature: ${temp3 + " °F"}`;

    var temp4 = res.daily[4].temp.day;
    var ftemp4 = document.createElement("p");
    C4.append(ftemp4);
    ftemp4.textContent = `Temperature: ${temp4 + " °F"}`;

    var temp5 = res.daily[5].temp.day;
    var ftemp5 = document.createElement("p");
    C5.append(ftemp5);
    ftemp5.textContent = `Temperature: ${temp5 + " °F"}`;

    //wind speed element
    var wind1 = res.daily[1].wind_speed;
    var fwind1 = document.createElement("p");
    C1.append(fwind1);
    fwind1.textContent = `Wind Speed: ${wind1 + " mph"}`;

    var wind2 = res.daily[2].wind_speed;
    var fwind2 = document.createElement("p");
    C2.append(fwind2);
    fwind2.textContent = `Wind Speed: ${wind2 + " mph"}`;

    var wind3 = res.daily[3].wind_speed;
    var fwind3 = document.createElement("p");
    C3.append(fwind3);
    fwind3.textContent = `Wind Speed: ${wind3 + " mph"}`;

    var wind4 = res.daily[4].wind_speed;
    var fwind4 = document.createElement("p");
    C4.append(fwind4);
    fwind4.textContent = `Wind Speed: ${wind4 + " mph"}`;

    var wind5 = res.daily[5].wind_speed;
    var fwind5 = document.createElement("p");
    C5.append(fwind5);
    fwind5.textContent = `Wind Speed: ${wind5 + " mph"}`;

    //humidity element
    var hum1 = res.daily[1].humidity;
    var fhum1 = document.createElement("p");
    C1.append(fhum1);
    fhum1.textContent = `Humidity: ${hum1 + " %"}`;

    var hum2 = res.daily[2].humidity;
    var fhum2 = document.createElement("p");
    C2.append(fhum2);
    fhum2.textContent = `Humidity: ${hum2 + " %"}`;

    var hum3 = res.daily[3].humidity;
    var fhum3 = document.createElement("p");
    C3.append(fhum3);
    fhum3.textContent = `Humidity: ${hum3 + " %"}`;

    var hum4 = res.daily[4].humidity;
    var fhum4 = document.createElement("p");
    C4.append(fhum4);
    fhum4.textContent = `Humidity: ${hum4 + " %"}`;

    var hum5 = res.daily[5].humidity;
    var fhum5 = document.createElement("p");
    C5.append(fhum5);
    fhum5.textContent = `Humidity: ${hum5 + " %"}`;
};

cityBtn.addEventListener("click", formSubmitHandler);
storedCitiesBtn.addEventListener("click", citySearchHandler);