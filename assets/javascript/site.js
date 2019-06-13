

$(document).ready(function() {

    // empty array of animals
    var animals = [];


    // function to display the animal gifs
    function showMeTheZoo() {

        // grabbing and storing a data-animal propery value
        var animal = $(this).attr("data-animal");

        // constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=ED4tN7E9IwOCjDlwDrUO9h9GcL7hoZbA&limit=10";

        // Performing an ajax request with the queryURL

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // show the complete queryURL to ensure its ok
            console.log(queryURL);

            // show the object in the response from the API
            console.log(response);

            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // looping through each result item
            for (let i = 0; i < results.length; i++) {
                
                // storing animal div
                var animalDiv = $("<div>");

                // creating a paragraph with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // creating and storing an image tag
                var animalImage = $("<img>");

                // setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height.url);

                // appending the paragraph and image tag to the animal div
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prepending the animalDiv to the HTML page in the #gif-card-body
                $("#gif-card-body").prepend(animalDiv);
            }
        })
    }


    
    // function for displaying animal gifs
    function renderButtons() {

        // important to delete the old buttons so they don't repeat
        $("#button-dump").empty();

        // looping through array of animals
        for (let j = 0; j < animals.length; j++) {
            
            // dynamically generate button
            var a = $("<button>");

            // adding the class for all buttons
            a.addClass("new-button");

            // adding a data attribute
            a.attr("data-animal", animals[j]);

            // providing the intial button text
            a.text(animals[j]);

            // adding the button to the buttons-view div
            $("#button-dump").append(a);
        }
    }

    // adding event listener for the user submission
    $("#choose-an-animal").on("click", function(event) {
        // take advantage of HTML "submit" property
        
        // clear input bar
        $("#gif-submitter").empty();

        

        // prevent page from reloading on form submit
        event.preventDefault();

        // grab the animal name from the array
        var animal = $("#gif-submitter").val().trim();

        // adding the animal name from the text-box to the array
        animals.push(animal);

        // calling renderButtons to display the initial buttons
        renderButtons();

    })

    $(document).on("click", ".new-button", showMeTheZoo);

})