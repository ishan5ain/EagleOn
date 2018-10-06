const request = require('request');
const fs = require('fs');
const geocode = require('./geocode/geocode');

var start_loc = [37.386528, -122.066831];
var end_loc = [37.368049, -122.000290];

var myKey = 'AIzaSyBmzOkGZOjLtezQM9uWltLmEAh1eKhM0Y0';

var price_estimates = {
  url: `https://api.uber.com/v1.2/estimates/price?start_latitude=${start_loc[0]}&start_longitude=${start_loc[1]}&end_latitude=${end_loc[0]}&end_longitude=${end_loc[1]}`,
  headers: {
    Authorization: 'Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAD5Lh4pBgHnaLJy3UqtT3tZsAAAAm5xFeK4992zVvEhItH5YlWdJCtLVONdcdeReLQbLYkHWtZ2yLKFCXY1trc8T3fey0FkzLPobGqFDNzMdNt3DRKgDlhQTdZMSn5CzPZGG2C-Bqlicu-GFfY2IYrHEu48lwNZUaH3xDceO6hU0DAAAAJi4-JxymwhxbPF6_yQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU',
    json: true
  }
}


geocode.reverse_geocode(end_loc, (err, add) => {
  if (err) {
    console.log('SOME KIND OF ERR');
  } else {
    console.log(add.address);
  }
});

geocode.reverse_geocode(start_loc, (err, add) => {
  if (err) {
    console.log('SOME KIND OF ERR');
  } else {
    console.log(add.address);
  }
});

// var reverse_geocode = {
//   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${end_loc[0]},${end_loc[1]}&key=${myKey}`,
//   json: true
// }
// request(reverse_geocode, function(err, res, body){
//   console.log(body.results[0].formatted_address);
//   fs.writeFileSync('reverse_geocode.json', body);
// });

// request(price_estimates, function(error, res, body) {
//   console.log(JSON.stringify(body, undefined, 2));
//   console.log(body);
//   fs.writeFileSync('response.json', body);
// });


//https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075
//37.7752315
//-122.418075
//37.7752415
//-122.518075


// y combinator
//37.386528, -122.066831
// reed
//37.368049, -122.000290

//google maps api key
//AIzaSyBmzOkGZOjLtezQM9uWltLmEAh1eKhM0Y0

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
