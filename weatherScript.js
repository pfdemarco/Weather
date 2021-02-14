$(document).ready(function() {//dont forget this cause it will ruin your day

  function initThis(){
   // getWeather();
   //should do some logic checking on this but for each one? 
   if (window.localStorage.length != 0){
     $("#cityDate").text(window.localStorage.getItem("Descr"));
     $("#temp").text(window.localStorage.getItem("Temp: "));
     $("#humid").text(window.localStorage.getItem("Humidity: "));
     $("#wind").text(window.localStorage.getItem("Wind Speed: "));
     $(".card-text0").text(window.localStorage.getItem("Day0Cond"));
     $(".card-img-top0").attr("src",window.localStorage.getItem("Day0Icon"));
     $(".card-text1").text(window.localStorage.getItem("Day1Cond"));
     $(".card-img-top1").attr("src",window.localStorage.getItem("Day1Icon"));
     $(".card-text2").text(window.localStorage.getItem("Day2Cond"));
     $(".card-img-top2").attr("src",window.localStorage.getItem("Day2Icon"));
     $(".card-text3").text(window.localStorage.getItem("Day3Cond"));
     $(".card-img-top3").attr("src",window.localStorage.getItem("Day3Icon"));
     $(".card-text4").text(window.localStorage.getItem("Day4Cond"));
     $(".card-img-top4").attr("src",window.localStorage.getItem("Day4Icon"));
     $("#uvi").text("UV Index: " + window.localStorage.getItem("uvVal")); 
     $("#uvi").css("color", window.localStorage.getItem("uvColor"));
   }
   else { 
    $("#search-input").val("troy,ny");
    getWeather();
   }
    
  };

  function getWeather(){
    // get the search text do some logic on this once it works and you have time
    var sIn = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + sIn + ",840&appid=ca623f88e9a094baf03a0e31d283744f&units=imperial";
    
    //840 is usa https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
    //get the url info
    $.ajax({
      url: queryURL,
      method: "GET"
  })
   
    // response has all the goodness in it
    .then(function(response) {
    // log it to see whats in it
      //console.log(response);
      //console.log(response.city.name);
      //populate right side with teh json object returned
      $("#cityDate").text("Currently in " + response.city.name + " its " + response.list[0].weather[0].description + " today.");
      window.localStorage.setItem("Descr" , "Currently in " + response.city.name + " its " + response.list[0].weather[0].description + " today.");
      $("#temp").text("Temp: " + response.list[0].main.temp +"F");
      window.localStorage.setItem("Temp: " , "Temp: " + response.list[0].main.temp +"F");
      $("#humid").text("Humidity: " + response.list[0].main.humidity + "%");
      window.localStorage.setItem("Humidity: " , "Humidity: " + response.list[0].main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.list[0].wind.speed + "MPH");
      window.localStorage.setItem("Wind Speed: " , "Wind Speed: " + response.list[0].wind.speed + "MPH");

     console.log(response);
      const lati = response.city.coord.lat;
      const long = response.city.coord.lon;
      //now go get UV Index from the one call api using the vars above

     let previousDay = "";
     let indexI = 0;
     response.list.forEach((element) => {
      //card-img-top0 is the image area of card
      //card-text0 is the text area of card
      //THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
       //whats up with elemtn
       const day = dayjs(element.dt_txt).format('dddd');
       const dateDisp = dayjs(element.dt_txt).format('MM-DD-YYYY hh:mm:ss');
       if (day != previousDay){
        //get vals you need from element 
        //only console day 1 each time the day changes...
        //im better than this lather rinse repeat just busy man.... 
         previousDay = day;
         let strCond = day + " " + element.dt_txt + " Conditions: " + element.weather[0].description + " Temp: " + element.main.temp + " Humidity: " + element.main.humidity;
         let icoPic = "http://openweathermap.org/img/wn/" + element.weather[0].icon + ".png";
         
         console.log(element);
        if (indexI  == 0){
          $(".card-text0").text(strCond);
          $(".card-img-top0").attr("src",icoPic);
          window.localStorage.setItem("Day0Cond", strCond);
          window.localStorage.setItem("Day0Icon", icoPic);
        }
        else if (indexI == 1){
          $(".card-text1").text(strCond);
          $(".card-img-top1").attr("src", icoPic);
          window.localStorage.setItem("Day1Cond", strCond);
          window.localStorage.setItem("Day1Icon", icoPic);
        }
        else if (indexI == 2){
          $(".card-text2").text(strCond);
          $(".card-img-top2").attr("src", icoPic);
          window.localStorage.setItem("Day2Cond", strCond);
          window.localStorage.setItem("Day2Icon", icoPic);
        }
        else if (indexI == 3){
          $(".card-text3").text(strCond);
          $(".card-img-top3").attr("src", icoPic);
          window.localStorage.setItem("Day3Cond", strCond);
          window.localStorage.setItem("Day3Icon", icoPic);
        }
        else if (indexI == 4){
          $(".card-text4").text(strCond);
          $(".card-img-top4").attr("src", icoPic);
          window.localStorage.setItem("Day4Cond", strCond);
          window.localStorage.setItem("Day4Icon", icoPic);
        }
         indexI ++;
         
       }

     });
       
     getUVI(lati, long);
     
    });
  }
  
  function getUVI(x,y){
    $.ajax({
      url:"https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f",
      method: "GET"
    })
      .then(function(response){
        //console.log(response);
        //0-2 minimal
        //3-4 low
        //5-6 moderate
        //7-9 high
        //>=10 very high
        var uvI = response.current.uvi;
        $("#uvi").text("UV Index: " + response.current.uvi); 
        window.localStorage.setItem("uvVal", uvI);
        if (uvI >= 0 && uvI <= 4){
          $("#uvi").css("color", "green");
          window.localStorage.setItem("uvColor", "green");
        }
        else if (uvI >= 5 && uvI <= 6){
          $("#uvi").css("color", "orange");
          window.localStorage.setItem("uvColor", "orange");
        }
        else if (uvI >= 7){
          $("#uvi").css("color", "red");
          window.localStorage.setItem("uvColor", "red");
        }
      })
  }

  //this here below is so important doesnt work if you have 
  //.list-group-items and no li as a second parameter WHY!?
  //event delegation 
  //attach a click event listener to the list group 
  //the function event wont fire unless you literally click on a li
  //inputs and buttons only have val();!!!!.
  $(".list-group").on("click", "li", function(event){
    //when they click on a past ietm load it up baby!
    //why does this not work for newly added rows... is it val or what 
    //console.log(event);
    $("#search-input").val($(this).text());//set the val of search area
    getWeather();//update with this city
  });

 $("#search-button").on("click", function(Event){
   var tagit = $("<li>");//create a li item

   tagit.attr("class", "new-item");
   tagit.addClass("list-group-item");
   
   var t = $("#search-input").val();

   tagit.text(t);

   $(".list-group").append(tagit);  //<li class="list-group-item">Boston</li>
  // console.log(tagit);

   getWeather();
 });

//maybe a long shit show of $() for recalling the curent and 5 day weather from local storage goes here.
  initThis();

});







//the json return object has the following 
 //0 index = today
 //5 = noon next day
 //13 noon 2 days out
 //21 noon 3 days out
 //29 noon 4 days out 
 //37 noon 5th day out






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