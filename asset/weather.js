$( document ).ready(function() {
    //this loads a default set of cities
    let  citySearchResultsArray = ["Austin", "Chicago", "New York", "Orlando","San Francisco","Seattle","Denver","Atlanta"];

    function renderCityNames() {
        $("#pastSearchResults").empty();

        // Looping through citySearchResultsArray
        for (let i = 0; i < 8; i++) {

            //generating a tags for each search result
            let aTag = $("<a>");
            // Adding a class
            aTag.addClass("list-group-item");
            // Added a data-attribute
            aTag.attr("data-name","SearchResult"+[i],"href","#");
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

            // The movie from the textbox is then added to our array
            citySearchResultsArray.unshift(pastSearch);
            citySearchResultsArray.pop(pastSearch);

            renderCityNames();
            console.log(citySearchResultsArray);
            });
            
            renderCityNames();
            
    // $('#searchForCitySubmitBtn').click(function(e){
    //     e.preventDefault()
    //     let citySearchResult = $('#searchForCity').val();
    //     console.log(citySearchResult);
    // });
    // console.log(citySearchResult);
});