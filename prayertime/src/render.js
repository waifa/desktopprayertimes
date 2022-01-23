function changeTimezone(date, ianatz) {

    // suppose the date is 12:00 UTC
    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
  
    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();
  
    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
  
  }

function getPrayerTime(){
  //API used: https://prayertimes.date/api/docs/today
  fetch('https://api.pray.zone/v2/times/today.json?city=toronto')
  .then(response => response.json())
  .then(data => {
    document.getElementById("fajrtime").innerHTML = data.results.datetime[0].times.Fajr
    document.getElementById("dhuhrtime").innerHTML = data.results.datetime[0].times.Dhuhr
    document.getElementById("asrtime").innerHTML = data.results.datetime[0].times.Asr
    document.getElementById("maghribtime").innerHTML = data.results.datetime[0].times.Maghrib
    document.getElementById("ishatime").innerHTML = data.results.datetime[0].times.Isha
  })
  
}
getPrayerTime()

function showTime(){

  var date = new Date();
  var local = changeTimezone(date, "America/Toronto");
  var h = local.getHours(); // 0 - 23
  var m = local.getMinutes(); // 0 - 59
  var s = local.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  
  //add feature to refresh every minute and not display seconds
  //also fix css so that text resizes based on window size
  document.getElementById("MyClockDisplay").innerText = "Local Time: " + time;
  // document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}
showTime();
