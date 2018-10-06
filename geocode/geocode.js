const request = require('request');

var myKey = 'AIzaSyBmzOkGZOjLtezQM9uWltLmEAh1eKhM0Y0';

var reverse_geocode = (loc, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc[0]},${loc[1]}&key=${myKey}`,
    json: true
  }, function (err, res, body ) {
    if (err) {
      callback('ERROR');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address
      });
    }
  });

};

module.exports.reverse_geocode = reverse_geocode;
