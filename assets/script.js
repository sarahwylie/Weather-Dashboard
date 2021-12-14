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
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ab3299daa73e778a4f0c3bf18298f8d6`;
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
            fetchWeather(res.city);
            storeCity();
        })

        // .catch(function (error) {
        //     alert("Unable to connect to weather service");
        // });
};

var history = [];

//add city to stored list
var storeCity = function (city) {
history.push(city);
localStorage.setItem("searchHistory", JSON.stringify(history));
    // $("#stored .form-input").val(localStorage.getItem("stored"));
    // for (history) {
    //     textContent
    //     // text content for cityBtn
    //     // clear section prior to appending
    // }
};

//Display the current weather
var displayCurrentWeather = function (city, nugz, timezone) {
    console.log(nugz)

    // var date = nugz.list[0].dt_txt;
    var temp = nugz.temp;
    var wind = nugz.wind_speed;
    var humidity = nugz.humidity;
    var uvi = nugz.uvi;

    var container = document.createElement("div");
    var body = document.createElement("div");
    var header = document.createElement("h2");
    // var pdate = document.createElement("h3");
    var image = document.createElement("img")
    var ptemp = document.createElement("p");
    var pwind = document.createElement("p");
    var phumidity = document.createElement("p");
    var puvi = document.createElement("p");

    container.append(body);
    header.textContent = `${city}`
    // pdate.textContent = `${dt_txt}`

    var getIcon = nugz.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${getIcon}.png`
    header.append(image);

    ptemp.textContent = `Temperature: ${temp}`
    pwind.textContent = `Wind: ${wind}`
    phumidity.textContent = `Humidity: ${humidity}`
    puvi.textContent = `UV Index: ${uvi}`

    body.append(header, pdate, ptemp, pwind, phumidity, puvi);
    weatherOutput.innerHTML = " ";
    weatherOutput.append(container);

    var currentForecast = nugz.list[0];
    console.log(currentForecast)

    var forecast = currentForecast.weather[0];
    console.log("forecast", forecast)

    //openweathermap.org/img/w/04d
    // var getIcon = nugz.weather[0].icon;
    // // var image = document.createElement("img")
    // image.src = "https://openweathermap.org/img/w/" + getIcon + ".png"
    // console.log("image", image);
    //append to container
    // image.appendChild(weatherOutput);
};

var fetchWeather = function (pball) {
    var lat = pball.coord.lat;
    var lon = pball.coord.lon;
    var city = pball.name;
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ab3299daa73e778a4f0c3bf18298f8d6`

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