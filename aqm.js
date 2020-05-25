function convertDateToHKT(updatedAt) {
  const date = new Date(Date.parse(updatedAt));

  /*
   * This is a lot more fiddly than it needs to be.  For whatever reason,
   * JavaScript doesn't have a strftime(3) standard library function.
   *
   * The "en-SE" locale was determined by experiment to be the one that
   * produces ISO 8601 "YYYY-MM-DD" and "HH:MM:SS" strings.
   */

  return (date.toLocaleDateString("en-SE", { timezone: "Asia/Hong_Kong" }) +
    "T" + date.toLocaleTimeString("en-SE", { timeZone: "Asia/Hong_Kong" }) +
    "+08:00");
}

function updateValues(json) {
  $.each(json.sensors, function(i, val) {
    switch (val.title) {
    case "PM10":
      $("#pm10").html(val.lastMeasurement.value + " " + val.unit);
      break;
    case "PM2.5":
      $("#pm25").html(val.lastMeasurement.value + " " + val.unit);
      break;
    case "Temperatur":
      $("#temperature").html(val.lastMeasurement.value + val.unit);
      break;
    case "rel. Luftfeuchte":
      $("#rh").html(val.lastMeasurement.value + val.unit);
      break;
    case "Luftdruck":
      $("#pressure").html(val.lastMeasurement.value + " " + val.unit);
      break;
    }
  });
}

function getAqmData() {
  $.getJSON("https://api.opensensemap.org/boxes/5e1afe5fe620bc001a21a9e4")
  .fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
    $("#timestamp").addClass("danger");
    $("#timestamp").html("UNKNOWN");
  })
  .done(function(json) {
    $("#timestamp").addClass("okay");
    $("#timestamp").html(convertDateToHKT(json.updatedAt));
    updateValues(json);
  })
}

getAqmData();
