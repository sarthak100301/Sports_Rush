//USER LOGIC
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 4000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("navimage1").style.display = "block";
}


function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    $("div#main").css("opacity","0.5");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $("div#main").css("opacity","1");
}

function getWeatherData(locatedUser){
  $.ajax({
    url:'http://api.openweathermap.org/data/2.5/weather?q=Kolkata&APPID=2b27a0a40b563e713ff359067ffba1dd',
    success:function(data){
      var today = new Date();
      var weekday = new Array(7);
      weekday[0] =  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      $("div.content#weather").text("");
      $("div.content#weather").append("<div>"+
        "<h2>"+data.name+","+data.sys.country+"</h2>"+
        "<h3>"+weekday[today.getDay()]+","+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+"</h3>"+
        "<h3>"+data.weather[0].description+"</h3>"+
        "<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png' alt='weather-icon'></img>"+
        "</div>");

    },
    error:function (err) {
      console.log(err);
    }

  });
}


$(document).ready(function(){

  getWeatherData();
});

