$( document ).ready(function() {
    //this loads a default set of cities
    let  citySearchResultsArray = [];
    //function
    function renderCityNames() {
        $("#pastSearchResults").empty();
        //for loop that checks if array is not empty, if true then excute loop
        if (!(citySearchResultsArray === undefined || citySearchResultsArray.length == 0)){
            for(let i=0; i <citySearchResultsArray.length; i++){
                //creates a template string with html class/id tags
                let searchResultHTML = 
                        `<button id="searchItem${i}" class="list-group-item capitalize" data-name="SearchResult${i}" href="#">${citySearchResultsArray[i]}</button>`;
                //appends searchResultHTML to #pastSearchResults
                $("#pastSearchResults").append(searchResultHTML);
            };
        };
    };
    //listenere that runs teh fucntion render city name when clicking the submit button
    $("#searchForCitySubmitBtn").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var pastSearch = $('#searchForCity').val().trim();
    
        //adds search result to list and removes last one
        citySearchResultsArray.unshift(pastSearch);
        if(citySearchResultsArray.length>7){
        citySearchResultsArray.pop(pastSearch);
        };
        renderCityNames();
        $('#date').html(pastSearch)
        $('#date').append(moment().format(' (MM/DD/YYYY)'));
        });
    renderCityNames()

    //ajax connected to search result
    $("#searchForCitySubmitBtn").on("click", function(event) {
        event.preventDefault();
        $("#weatherInfoMain").empty();
        $("#mainWeatherBody").empty();
        $("#weatherInfo5Day").empty();
        // This line grabs the input from the textbox
        let pastSearch = $('#searchForCity').val().trim();
        let APIKey = "166a433c57516f51dfab1f7edaed8413";
        // Here we are building the URL we need to query the database
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +pastSearch+ "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            // Log the resulting object lat and lon cords
            let lat = (response.coord.lat);
            let long = (response.coord.lon);
            // new qury url that incorparates coords from last ajax call
            let queryURLNew = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=" + APIKey;
            $.ajax({
                url: queryURLNew,
                method: "GET"
            })
            .then(function(responseNew) {
                let temp = responseNew.current.temp
                let hum = responseNew.current.humidity
                let wind = responseNew.current.wind_speed
                let uvIndexValue = responseNew.current.uvi
                let weatherMainHeaderArea = `
                <div id="mainWeatherBody"class="card">
                    <div class="card-body capitalize">
                        <h2 id="date" class="card-title"></h2>
                        <p id="main-temp" class="card-text"></p>
                        <p id="main-humid" class="card-text"></p>
                        <p id="main-wind" class="card-text"></p>
                        <p id="main-UV" class="card-text"></p>
                    </div>
                </div>`;
                $("#weatherInfoMain").append(weatherMainHeaderArea);
                let fiveDayHeader = `<h3 class="fiveDayForecastHeader">5-day Forecast:</h3>
                <div class="card-deck"></div>`;
                $("#weatherInfo5Day").append(fiveDayHeader);
                //gives current day plus 1 day
                for (let i = 1; i < 6; i++){
                    let new_date = moment().add(`${i}`, 'd').format(' (MM/DD/YYYY)');
                    console.log(new_date)
                let fiveDayWeather = `
                    <div class="card bg-primary">
                        <div class="card-body fiveDay">
                            <h5 class="card-title">${new_date}</h5>
                            <p class="card-text">Icon</p>
                            <p class="card-text">Temp: 98.3 F</p>
                            <p class="card-text">Humidity: 41%</p>
                        </div>
                    </div>
                `;
                $("div.card-deck").append(fiveDayWeather);
                }

                //api calls
                let uvIndex = `<span id="uvIndexColor">${uvIndexValue}</span>`;
                $('#date').html(citySearchResultsArray[0])
                let currentDate = (moment().format(' (MM/DD/YYYY)'))
                $('#date').append(currentDate); 

                let fTempConv = (Math.round((temp-273.15)*(9/5)+32))
                $("#main-temp").text("Temperature: " + fTempConv +" F")
                $("#main-humid").text("Humidity: " + hum +"%")
                $("#main-wind").text("Wind Speed: " + wind +" MPH")
                $("#main-UV").html(("UV Index: " + uvIndex));

                    if (uvIndexValue<=2) {
                    $("#main-UV").addClass("uvIndexColor-low")
                    }else if (uvIndexValue>=3 && uvIndexValue<=5.99) {
                    $("#uvIndexColor").addClass("uvIndexColor-moderate")
                    }else if (uvIndexValue>=6 && uvIndexValue<=7.99) {
                    $("#uvIndexColor").addClass("uvIndexColor-high")
                    }else if (uvIndexValue>=8 && uvIndexValue<=10.99) {
                    $("#uvIndexColor").addClass("uvIndexColor-very-high")
                    }else 
                    if (uvIndexValue>=11) {
                    $("#uvIndexColor").addClass("uvIndexColor-extreme")
                    };
                    console.log(responseNew.daily[1])
            })
        });
    });   
});
