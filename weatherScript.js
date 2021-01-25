$(document).ready(function() {//dont forget this cause it will ruin your day

  $(".butt").on("click", function(){
    var tagit = $("<li>");//create a li item

    tagit.attr("class", "list-group-item");
    tagit.text("city here");
    $(".list-group").append(tagit).textContent("uwsgiuregf");  //<li class="list-group-item">Boston</li>
    console.log(tagit);
  });

  $("#search-button").on("click", function(Event){
    console.log(Event)
  });

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






