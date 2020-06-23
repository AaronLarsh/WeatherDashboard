$( document ).ready(function() {
    //this loads a default set of cities
    let  citySearchResultsArray = [];
    $('#date').html(citySearchResultsArray[0])
    $('#date').append(moment().format(' (MM/DD/YYYY)'));
    //function
    function renderCityNames() {
        $("#pastSearchResults").empty();
        //for loop that checks if array is not empty, if true then excute loop
        if (!(citySearchResultsArray === undefined || citySearchResultsArray.length == 0)){
            console.log("true")
            for(let i=0; i <citySearchResultsArray.length; i++){
                //creates a template string with html class/id tags
                let searchResultHTML = 
                        `<button id="searchItem${i}" class="list-group-item capitalize" data-name="SearchResult${i}" href="#">${citySearchResultsArray[i]}</button>`;
                //appends searchResultHTML to #pastSearchResults
                $("#pastSearchResults").append(searchResultHTML);
            };
        };
    };
    $("#searchForCitySubmitBtn").on("click", function(event) {
        event.preventDefault();
        console.log(event)
        // This line grabs the input from the textbox
        var pastSearch = $('#searchForCity').val().trim();
    
        //adds search result to list and removes last one
        citySearchResultsArray.unshift(pastSearch);
        if(citySearchResultsArray.length>7){
        citySearchResultsArray.pop(pastSearch);
        };
        renderCityNames();
        console.log(citySearchResultsArray);
        $('#date').html(pastSearch)
        $('#date').append(moment().format(' (MM/DD/YYYY)'));
        });
    renderCityNames()
    //ajax connected to search result
    $("#searchForCitySubmitBtn").on("click", function(event) {
        event.preventDefault();
    
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
