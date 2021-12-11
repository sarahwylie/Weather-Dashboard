var cityBtn = document.querySelector(".btn");
var cityInputEl = document.querySelector("#city");
var weatherOutput = document.querySelector("#weather-container");

// var formSubmitHandler = function (event) {
//     event.preventDefault();
//     console.log("click");
//     //get value from input element
//     var city = cityInputEl.value.trim();

//     if (city) {
//         getCity(cityName);

//         //clear old content from weather data
//         cityStorage.textContent = "";
//         //clear old content from form input
//         weatherOutput.value = "";
//     } else {
//         alert("Please enter a city");
//     }
// };

// var getCity = function (cityName) {
//     //weather api url
//     var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ab3299daa73e778a4f0c3bf18298f8d6";

//     //make a request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             // request was successful
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     displayWeather(data)
//                 });
//             } else {
//                 alert("Error: City Not Found");
//             }
//         })
//         .catch(function (error) {
//             alert("Unable to connect to weather service");
//         });
// };

var displayWeather = function () {
    // check on data returned by API
    if (city.length === 0) {
        weatherOutput.textContent = "No weather found";
        return;
    }
    //loop over data
    for (var i = 0; i < city.length; i++) {
        //format data name
        var cityName = city[i];

        //create a container for each city
        var cityEl = document.createElement("a");
        cityEl.classList = "list-item flex-row justify-space-between align-center";
        cityEl.setAttribute("href", "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ab3299daa73e778a4f0c3bf18298f8d6")

        //create a span element to hold city names
        var titleEl = document.createElement("span");
        titleEl.textContent = cityName;

        //append to container
        cityEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //retrieve weather for specific city
        var retrieveWeather = statusEl.innerHTML("<i class='fas fa-times status-icon icon-danger'></i>" + cityEl)

        //append to container
        cityEl.appendChild(retrieveWeather);

        //append container to the dom
        weatherOutput.appendChild(cityEl);
    }
    var formSubmitHandler = function (event) {
        event.preventDefault();
        console.log("click");
        //get value from input element
        var city = cityInputEl.value.trim();
    
        if (city) {
            getCity(cityName);
    
            //clear old content from weather data
            cityStorage.textContent = "";
            //clear old content from form input
            weatherOutput.value = "";
        } else {
            alert("Please enter a city");
        }
    };
    
    var getCity = function (cityName) {
        //weather api url
        var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ab3299daa73e778a4f0c3bf18298f8d6";
    
        //make a request to the url
        fetch(apiUrl)
            .then(function (response) {
                // request was successful
                if (response.ok) {
                    response.json().then(function (data) {
                        displayWeather(data)
                    });
                } else {
                    alert("Error: City Not Found");
                }
            })
            .catch(function (error) {
                alert("Unable to connect to weather service");
            });
    };
};

cityBtn.addEventListener("click", formSubmitHandler);