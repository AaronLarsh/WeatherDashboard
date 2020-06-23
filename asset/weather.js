$( document ).ready(function() {
    //this loads a default set of cities
    let  citySearchResultsArray = ["Austin", "Chicago", "New York", "Orlando","San Francisco","Seattle","Denver","Atlanta"];
    $('#date').html(citySearchResultsArray[0])
    $('#date').append(moment().format(' (MM/DD/YYYY)'));

    //seelcts the main card and inserts city name and todays date
    function renderCityNames() {
        $("#pastSearchResults").empty();

        // Looping through citySearchResultsArray
        for (let i = 0; i < 8; i++) {

            //generating a tags for each search result
            let aTag = $("<a>");
            // Adding a class
            aTag.addClass("list-group-item");
            // Added a data-attribute
            aTag.attr("data-name","SearchResult"+[i]);
            aTag.attr("href","#");
            // Provided the initial button text
            aTag.text(citySearchResultsArray[i]);
            // Added the button to the HTML
            $("#pastSearchResults").append(aTag);
        }
    }

    // This function handles events where one button is clicked
    $("#searchForCitySubmitBtn").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var pastSearch = $('#searchForCity').val().trim();

    //adds search result to list and removes last one
    citySearchResultsArray.unshift(pastSearch);
    citySearchResultsArray.pop(pastSearch);

    renderCityNames();
    console.log(citySearchResultsArray);
    $('#date').html(pastSearch)
    $('#date').append(moment().format(' (MM/DD/YYYY)'));
    });
    
    renderCityNames();

    //ajax connected to search result
    $("#searchForCitySubmitBtn").on("click", function(event) {
        event.preventDefault();
    
        // This line grabs the input from the textbox
        var pastSearch = $('#searchForCity').val().trim();
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +pastSearch+ "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            let lat = (response.coord.lat);
            let long = (response.coord.lon);
            let queryURLNew = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,daily&appid=" + APIKey;
            console.log(queryURLNew)
            $.ajax({
                url: queryURLNew,
                method: "GET"
            })
            .then(function(responseNew) {
                console.log(responseNew)
            })
        });


    });
});