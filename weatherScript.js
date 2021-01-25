$(document).ready(function() {//dont forget this cause it will ruin your day

  $("#search-button").on("click", function(Event){
    var tagit = $("<li>");//create a li item

    tagit.attr("class", "list-group-item");
    
    var t = $("#search-input").val();

    tagit.text(t);

    $(".list-group").append(tagit);  //<li class="list-group-item">Boston</li>
    console.log(tagit);

    getWeather();
  });

  function getWeather(){
    // Storing our giphy API URL for a random cat image
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=troy,ny,840&appid=ca623f88e9a094baf03a0e31d283744f";

  //"https://api.openweathermap.org/data/2.5/onecall?lat=43.31&lon=4.59&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // After the data from the AJAX request comes back
    .then(function(response) {

    // Saving the image_original_url property
      console.log(response);
    });
  }
  

});




// $("#cat-button").on("click", function() {

//   // Storing our giphy API URL for a random cat image
//   var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats&rating=pg";

//   // Perfoming an AJAX GET request to our queryURL
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })

//   // After the data from the AJAX request comes back
//     .then(function(response) {

//     // Saving the image_original_url property
//       var imageUrl = response.data.image_original_url;

//       // Creating and storing an image tag
//       var catImage = $("<img>");

//       // Setting the catImage src attribute to imageUrl
//       catImage.attr("src", imageUrl);
//       catImage.attr("alt", "cat image");

//       // Prepending the catImage to the images div
//       $("#images").prepend(catImage);
//     });
// });






