var cityBtn = document.querySelector(".btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#current-weather");
// var city
// var cityWeather

var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCity(city);
        storeCity(city);

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
var storeCity = function (city) {
// history.push(city);
localStorage.setItem("searchHistory", JSON.stringify(history));
console.log("city", city)
var retrieveCity = function () {
    console.log("retrieve", searchHistory)
    // let stored = document.getElementById("stored");
    var stored = document.createElement("btn");
    JSON.parse(localStorage.getItem("searchHistory"));
    // stored.append(body);
    return history.textContent = "";
};
    $("#stored .form-input").val(localStorage.getItem("stored"));
    // for (history) {
    //     textContent
    //     // text content for cityBtn
    //     // clear section prior to appending
    // }
};

var retrieveCity = function () {
    console.log("retrieve", searchHistory)
    // let stored = document.getElementById("stored");
    var stored = document.createElement("btn");
    JSON.parse(localStorage.getItem("searchHistory"));
    // stored.append(body);
    history.textContent = "";
};

//Display the current weather
var displayCurrentWeather = function (city, nugz, timezone) {
    // console.log(nugz)

    var date = nugz.dt;
    var temp = nugz.temp;
    var wind = nugz.wind_speed;
    var humidity = nugz.humidity;
    var uvi = nugz.uvi;

    var container = document.createElement("div");
    var body = document.createElement("div");
    var header = document.createElement("h2");
    var pdate = document.createElement("h3");
    var image = document.createElement("img")
    var ptemp = document.createElement("p");
    var pwind = document.createElement("p");
    var phumidity = document.createElement("p");
    var puvi = document.createElement("p");

    container.append(body);
    header.textContent = `${city}`
    pdate.textContent = `${new Date(nugz.dt*1000)}`

    var getIcon = nugz.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
    header.append(image);

    ptemp.textContent = `Temperature: ${temp}`
    pwind.textContent = `Wind: ${wind}`
    phumidity.textContent = `Humidity: ${humidity}`
    puvi.textContent = `UV Index: ${uvi}`

    console.log(nugz)

    body.append(header, pdate, ptemp, pwind, phumidity, puvi);
    weatherOutput.innerHTML = " ";
    weatherOutput.append(container);

    var currentForecast = nugz.list;
    console.log(currentForecast)

    // var forecast = currentForecast.weather;
    

    //openweathermap.org/img/w/04d
    // var getIcon = nugz.weather[0].icon;
    // // var image = document.createElement("img")
    // image.src = "https://openweathermap.org/img/w/" + getIcon + ".png"
    // console.log("image", image);
    //append to container
    // image.appendChild(weatherOutput);
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

var displayFutureWeather = function(data) {
    var apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ab3299daa73e778a4f0c3bf18298f8d6&units=imperial`;
    fetch(apiUrlFuture)
    .then(function (response) {
        return response.json();
    })
    var fiveForecast = function(city, fore, timezone) {
    var fdate = fore.dt[1];
    var ftemp = fore.temp[1];
    var fwind = fore.wind_speed[1];
    var fhumidity = fore.humidity[1];
    var fuvi = fore.uvi[1];

    fdate = document.querySelector("date-1");
        displayFutureWeather.textContent = `${new Date(fore.dt[1]*1000)}`
    var fimage1 = document.querySelector("img-1")
    var getIcon = fore.weather[1].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
        displayFutureWeather.textContent = `${fimage1}`
    var fptemp = document.createElement("temp-1");
    displayFutureWeather.textContent = `${ftemp}`
    var fpwind = document.createElement("wind-1");
    displayFutureWeather.textContent = `${fwind}`
    var fphumidity = document.createElement("hum-1");
    displayFutureWeather.textContent = `${fhumidity}`
    var fpuvi = document.createElement("uvi-1");
    displayFutureWeather.textContent = `${fuvi}`

    // fheader.textContent = `${city}`
    // fpdate.textContent = `${new Date(fore.dt*1000)}`

    // var getIcon = nugz.weather[1].icon;
    // fimage.src = `https://openweathermap.org/img/w/${getIcon}.png`
    // fheader.append(image);

    // ftemp.textContent = `Temperature: ${temp}`
    // fwind.textContent = `Wind: ${wind}`
    // fhumidity.textContent = `Humidity: ${humidity}`
    // fuvi.textContent = `UV Index: ${uvi}`
    
    fbody.append(fheader, fpdate, fptemp, fpwind, fphumidity, fpuvi);
    weatherOutput.innerHTML = " ";
    weatherOutput.append(container);

    var futureForecast = fore.list;
    }

    // .then(function (res) {
    //     // console.log(res);
    //     fetchForecast(res);
    //     storeCity(res.name);
    // })
}

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