var cityBtn = document.querySelector(".city-btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#current-weather");
var forecast = document.querySelector("#forecast");
var storedCitiesBtn = document.querySelector("#stored");

var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCity(city);
        // storeCity(city);

        //clear old content from form input
        // weatherOutput.value = "";
        cityInputEl.value = "";

    } else {
        alert("Please enter a city");
    }
    storeCity();
    retrieveCity(city);
};

//access 
var getCity = function (city) {
    // event.preventDefault();
    //weather api url
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial`;
    console.log(apiUrl)
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            //             if (response.ok) {
            //                 response.json().then(function (data) {
            //                     displayCurrentWeather(data);
            //    //Save the city to local storage
            //             var captureData = $(this).siblings(".form-input").val()
            //             localStorage.setItem(cityInputEl);
            //                 });
            //             } else {
            //                 alert("Error: City Not Found");
            //             }
            return response.json();
        })
        .then(function (res) {
            console.log(res);
            fetchWeather(res);
            storeCity(res.name);
        })

    // .catch(function (error) {
    //     alert("Unable to connect to weather service");
    // });
};

var history = [];

//add city to stored list
var storeCity = function () {
    // history.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    // console.log("city", city)
    // var retrieveCity = function () {
    //     console.log("retrieve", searchHistory)
    //     // let stored = document.getElementById("stored");
    //     var stored = document.createElement("btn");
    //     JSON.parse(localStorage.getItem("searchHistory"));
    //     // stored.append(body);
    //     return history.textContent = "";
};
// for (history) {
//     textContent
//     // text content for cityBtn
//     // clear section prior to appending
// }

var retrieveCity = function (retrieveCity) {
    // console.log("retrieve", searchHistory)
    searchesEl = document.createElement("button");
    searchesEl.textContent = retrieveCity;
    searchesEl.classList = "d-flex w-100 btn border p-2";
    searchesEl.setAttribute("cityData", retrieveCity)
    searchesEl.setAttribute("type", "submit");
    storedCitiesBtn.prepend(searchesEl);

    // let stored = document.getElementById("stored");
    // var stored = document.createElement("btn");
    // JSON.parse(localStorage.getItem("searchHistory"));
    // // stored.append(body);
    // history.textContent = "";
    // $("#stored .form-input").val(localStorage.getItem("stored"));
};

var citySearchHandler = function (event) {
    var city = event.target.getAttribute("cityData")
    if (city) {
        displayCurrentWeather(city);
        displayFutureWeather(city);
    }
}

//Display the current weather
var displayCurrentWeather = function (city, nugz) {
    // console.log(nugz)

    weatherOutput.textContent = "";

    var date = nugz.dt;
    var temp = nugz.temp;
    var wind = nugz.wind_speed;
    var humidity = nugz.humidity;

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

    var getIcon = nugz.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
    header.append(image);

    ptemp.textContent = `Temperature: ${temp + " °F"}`
    pwind.textContent = `Wind: ${wind + "  mph"}`
    phumidity.textContent = `Humidity: ${humidity + " %"}`

    console.log(nugz)

    body.append(header, pdate, ptemp, pwind, phumidity);
    // weatherOutput.innerHTML = " ";
    weatherOutput.append(container);

    var currentForecast = nugz.list;
    console.log(currentForecast)

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    fetchUvi(lat, lon);
    // var forecast = currentForecast.weather;


    //openweathermap.org/img/w/04d
    // var getIcon = nugz.weather[0].icon;
    // // var image = document.createElement("img")
    // image.src = "https://openweathermap.org/img/w/" + getIcon + ".png"
    // console.log("image", image);
    //append to container
    // image.appendChild(weatherOutput);
};

var fetchUvi = function(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial`
    fetch (apiUrl)
    .then(function(response){
        response.json()
        .then(function(data){
            displayUvi(data)
           // console.log(data)
        });
    });
}

var displayUvi = function(index) {
    var uviEl = document.createElement("p");
    uviEl.textContent = `UV Index: ${uvi}`

    uviElVal = document.createElement("span")
    uviElVal = index.value
    if (index.value <= 2) {
        uviElVal.classList = "favorable"
    } else if (index.value > 2 && index.value <= 8) {
        uviElVal.classList = "moderate"
    } else if (index.value > 8) {
        uviElVal.classList = "severe"
    }
    
    uviEl.appendChild(uviElVal);
    weatherOutput.appendChild(uviEl);
};

var fetchWeather = function (pball) {
    // console.log(pball);
    var lat = pball.coord.lat;
    var lon = pball.coord.lon;
    var city = pball.name;
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial`

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);
            renderWeather(city, res);
        })
    // .catch(function (error) {
    //     alert("Unable to connect to weather service");
    // });
}

var renderWeather = function (city, data) {
    displayCurrentWeather(city, data.current, data.timezone);
    displayFutureWeather(data.daily);
}

var getFutureWeather = function (data) {
    var apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial`;
    fetch(apiUrlFuture)
    .then(function(response){
        response.json()
        .then(function(data){
                displayFutureWeather(data);
            })
        });
}

var displayFutureWeather = function (weather) {
    forecast.textContent = ""

    var date = weather.dt;
    var temp = weather.temp;
    var wind = weather.wind_speed;
    var humidity = weather.humidity;

    var fiveForecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyWeather = fiveForecast[i];

        var forecastEl = document.createElement("div");
        forecastEl.classList = "card forecast"

        var fdate = document.createElement("h3");
        fdate.textContent = `${new Date(date * 1000)}`;
        fdate.classList = "card-header";
        forecastEl.appendChild(fdate);

        var futureIcon = document.createElement("img")
        futureIcon.src = `https://openweathermap.org/img/w/${dailyWeather.weather[0].icon}.png`
        futureIcon.classList = "card-body";
        forecastEl.appendChild(futureIcon);

        var ftemp = document.createElement("p")
        ftemp.classList = "card-body"
        ftemp.textContent =  `Temperature: ${temp + " °F"}`
        forecastEl.appendChild(ftemp);

        var fwind = document.createElement("p")
        fwind.classList = "card-body"
        fwind.textContent =  `Wind: ${wind + " mph"}`
        forecastEl.appendChild(fwind);

        var fhum = document.createElement("p")
        fhum.classList = "card-body"
        fhum.textContent =  `Humidity: ${humidity + " %"}`
        forecastEl.appendChild(fhum);
    };

    // function(city, fore, timezone) {
    //     var fdate = fore.dt[1];
    //     var ftemp = fore.temp[1];
    //     var fwind = fore.wind_speed[1];
    //     var fhumidity = fore.humidity[1];
    //     var fuvi = fore.uvi[1];
    }


//     fdate = document.querySelector("date-1");
//         displayFutureWeather.textContent = `${new Date(fore.dt[1]*1000)}`
//     var fimage1 = document.querySelector("img-1")
//     var getIcon = fore.weather[1].icon;
//     image.src = `https://openweathermap.org/img/w/${getIcon}.png`
//         displayFutureWeather.textContent = `${fimage1}`
//     var fptemp = document.createElement("temp-1");
//     displayFutureWeather.textContent = `${ftemp}`
//     var fpwind = document.createElement("wind-1");
//     displayFutureWeather.textContent = `${fwind}`
//     var fphumidity = document.createElement("hum-1");
//     displayFutureWeather.textContent = `${fhumidity}`
//     var fpuvi = document.createElement("uvi-1");
//     displayFutureWeather.textContent = `${fuvi}`

//     // fheader.textContent = `${city}`
//     // fpdate.textContent = `${new Date(fore.dt*1000)}`

//     // var getIcon = nugz.weather[1].icon;
//     // fimage.src = `https://openweathermap.org/img/w/${getIcon}.png`
//     // fheader.append(image);

//     // ftemp.textContent = `Temperature: ${temp}`
//     // fwind.textContent = `Wind: ${wind}`
//     // fhumidity.textContent = `Humidity: ${humidity}`
//     // fuvi.textContent = `UV Index: ${uvi}`

//     fbody.append(fheader, fpdate, fptemp, fpwind, fphumidity, fpuvi);
//     weatherOutput.innerHTML = " ";
//     weatherOutput.append(container);

//     var futureForecast = fore.list;
//     }

// .then(function (res) {
//     // console.log(res);
//     fetchForecast(res);
//     storeCity(res.name);
// })
// }

cityBtn.addEventListener("click", formSubmitHandler);
storedCitiesBtn.addEventListener("click", citySearchHandler);