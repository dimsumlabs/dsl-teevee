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
    $("#timestamp").text(new Date(json.updatedAt).
                         toLocaleString("en-SE"));
    updateValues(json);
  })
}

getAqmData();
