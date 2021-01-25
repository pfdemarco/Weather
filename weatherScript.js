$(document).ready(function() {//dont forget this cause it will ruin your day

  //this here below is so important doesnt work if you have 
  //.list-group-items and no li as a second parameter WHY!?
   $(".list-group").on("click", "li", function(event){
     //when they click on a past ietm load it up baby!
     //why does this not work for newly added rows... is it val or what 
     console.log(event);
     $("#search-input").val($(this).text());//set the val of search area
     getWeather();//update with this city
   });

  
//the json return object has the following 
//0 index = today
//5 = noon next day
//13 noon 2 days out
//21 noon 3 days out
//29 noon 4 days out 
//37 noon 5th day out

  $("#search-button").on("click", function(Event){
    var tagit = $("<li>");//create a li item

    //tagit.attr("class", "list-group-item");
    tagit.addClass("list-group-item");
    var t = $("#search-input").val();

    tagit.text(t);

    $(".list-group").append(tagit);  //<li class="list-group-item">Boston</li>
    console.log(tagit);

    getWeather();
  });

  function getWeather(){
    // get teh search text do some logic on this once it works and you have time
    var sIn = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + sIn + ",840&appid=ca623f88e9a094baf03a0e31d283744f&units=imperial";
    //"https://api.openweathermap.org/data/2.5/forecast?q=troy,ny,840&appid=ca623f88e9a094baf03a0e31d283744f"
    //840 is usa https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes

    //"https://api.openweathermap.org/data/2.5/onecall?lat=43.31&lon=4.59&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f";

    //get the url info
    $.ajax({
      url: queryURL,
      method: "GET"
  })
    //the json return object has the following 
  //0 index = today
  //5 = noon next day
  //13 noon 2 days out
  //21 noon 3 days out
  //29 noon 4 days out 
  //37 noon 5th day out
  // response has all teh goodness in it
    .then(function(response) {
    // log it to see whats in it
      console.log(response);
      console.log(response.city.name);
      //populate right side with teh json object returned
      $("#cityDate").text("Currently in " + response.city.name + " its " + response.list[0].weather[0].description + " today.");
      $("#temp").text("Temp: " + response.list[0].main.temp +"F");
      $("#humid").text("Humidity: " + response.list[0].main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.list[0].wind.speed + "MPH");
      
      const lati = response.city.coord.lat;
      const long = response.city.coord.lon;
      //now go get UV Index from the one call api using the vars above
     
     getUVI(lati, long);
     
    });
  }
  
  function getUVI(x,y){
    $.ajax({
      url:"https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f",
      method: "GET"
    })
      .then(function(response){
        console.log(response);
        $("#uvi").text("UV Index: " + response.current.uvi); 
      })
  }
});




//<div id="cityDate"></div>
//<div id="temp"></div>
//<div id="humid"></div>
//<div id="wind"></div>
//<div id="uvi"></div>










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




// MAJOR TASK #2: ATTACH ON-CLICK EVENTS TO "LETTER" BUTTONS
      // =================================================================================

      // 7. Create an "on-click" event attached to the ".letter-button" class.
      // $(".letter-button").on("click", function() {

      //   // Inside the on-click event...

      //   // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.
      //   var fridgeMagnet = $("<div>");

      //   // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".
      //   fridgeMagnet.addClass("letter fridge-color");

      //   // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
      //   // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
      //   // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
      //   fridgeMagnet.text($(this).attr("data-letter"));

      //   // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
      //   // Again you can see we use that find, and once its found we append the item
      //   $("#display").append(fridgeMagnet);

      // });


