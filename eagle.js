const request = require('request');
const fs = require('fs');
const geocode = require('./geocode/geocode');
const uber = require('./uber/uber');
const moment = require('moment');
moment().format();

var start_loc = [37.386528, -122.066831];
var end_loc = [37.368049, -122.000290];

var distancePrinted = false;

var nowLog = `./logs/log_${moment()}.txt`;

// console.log(moment());

console.log(``);
fs.writeFileSync(nowLog, ` - \n`);
console.log(``);
fs.appendFileSync(nowLog, ` - \n`);

fs.appendFileSync(nowLog, `${moment()} – Eagle is On\n`);

geocode.reverse_geocode(start_loc, (err, add) => {
  if (err) {
    console.log('SOME KIND OF ERR');
  } else {
    console.log(`> FROM: ${add.address}`);
    fs.appendFileSync(nowLog, `> FROM: ${add.address}\n`);
    geocode.reverse_geocode(end_loc, (err, add) => {
      if (err) {
        console.log('SOME KIND OF ERR');
      } else {
        console.log(`> TO: ${add.address}`);
        fs.appendFileSync(nowLog, `> TO: ${add.address}\n`);
      }
    });
  }
});



setInterval(function (){
  uber.getPriceEstimates(start_loc, end_loc, (err, prices) => {
    if (err) {
      console.log(err);
    } else {

      if (!distancePrinted) {
        console.log(``);
        console.log(`> Distance: ${prices[0].distance} miles`);
        fs.writeFileSync('response.json', JSON.stringify(prices, undefined, 2));
        fs.appendFileSync(nowLog, `> Distance: ${prices[0].distance} miles\n`);
        distancePrinted = true;
      }

      console.log(`> ${moment()} – ${prices[prices.length-1].localized_display_name}: $${prices[prices.length-1].low_estimate}–${prices[prices.length-1].high_estimate}`);
      fs.appendFileSync(nowLog, `> ${moment()} – ${prices[prices.length-1].localized_display_name}: $${prices[prices.length-1].low_estimate}–${prices[prices.length-1].high_estimate}`);

      //fetching actual price estimate
      uber.getRequestEstimate(start_loc, end_loc, prices[prices.length-1].product_id, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`> Actually, $${data.fare.value}`);
          fs.appendFileSync(nowLog, `  Actually, $${data.fare.value}\n`)
          fs.writeFileSync('requestEstimate.json', data);
        }
      });

      // for (var i = prices.length - 1; i >= 0; i--) {
      //   console.log(`> ${prices[i].localized_display_name}: $${prices[i].low_estimate}–${prices[i].high_estimate}`);
      //   // console.log(`> $${prices[i].low_estimate}–${prices[i].high_estimate}`);
      // }
      // console.log(``);
      // console.log(``);
    }
  });
}, 6000);





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
