// Meteor.setInterval( function() {

const sendPosition = function sendPosition() {
  navigator.geolocation.getCurrentPosition(
  function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log("lat and long", position.coords.latitude, " ", position.coords.longitude);

    Meteor.call("updatePosition", lat, long, function(err, res) {
      console.log("updatePosition called");
      if (res) console.log("result: ", res);
      if (err) console.log("error while calling updatePosition! ", err);
    });
  }, 
  function(positionError) {
    console.log("Position could not be retrieved. code: ", positionError.code, " message: ", positionError.message);
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  );
}
// }, 5000);

export default sendPosition;