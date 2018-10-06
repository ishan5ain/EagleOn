const request = require('request');
const fs = require('fs');

var bearer_token = 'JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAKeEGgsouLOVzEUK7UHuBWNsAAAAKzvXzCnZFX3X4HwGMn8jWjEAt8r9DVAD2fi7lWpagsOcEnrb2kIJABtlesagoCvwpsWjMfMU4pjxMtT3a6l0uFxGT8zNReP-RQ5HC8GEWOJBtNtXbUbmARZXaiagXnEN83IDM9farwxCtpJEDAAAAFreq64Mlu5yf2ew9iQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU';

var getPriceEstimates = (start_loc, end_loc, callback) => {
  request({
    url: `https://api.uber.com/v1.2/estimates/price?start_latitude=${start_loc[0]}&start_longitude=${start_loc[1]}&end_latitude=${end_loc[0]}&end_longitude=${end_loc[1]}`,
    json: true,
    headers: {
      Authorization: `Bearer ${bearer_token}`
    }
  }, function(err, res, body) {
    if (err) {
      callback('FUCKING MOTHER OF ERROR!');
    } else {
      callback(undefined, body.prices);
      fs.writeFileSync('prices.json', JSON.stringify(body.prices, undefined, 2));
    }
  });
};




var getRequestEstimate = (start_loc, end_loc, product_id, callback) => {
  var postData = {
    product_id: product_id,
    start_latitude: `${start_loc[0]}`,
    start_longitude: `${start_loc[1]}`,
    end_latitude: `${end_loc[0]}`,
    end_longitude: `${end_loc[1]}`
  };
  request({
    method: 'POST',
    url: `https://api.uber.com/v1.2/requests/estimate`,
    body: JSON.stringify(postData, undefined, 2),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer_token}`
    }
  }, function(err, res, body) {
    if (err) {
      callback('EROOR!');
    } else {
      callback(undefined, JSON.parse(body));
    }
  });
}

// var getToken = (callback) => {
//   request({
//     url: `https://login.uber.com/oauth/v2/token`,
//     json: true,
//     headers: {
//       client_secret = 'y4d85Lvqfdydx8V-OhyVviZhcLpJbrBeYGm1J57E',
//       client_id = 'U7V9o6oO0hV-caqkom6EkESxs9gEb_sV',
//       grant_type = 'authorization_code',
//       redirect_uri = 'http://localhost',
//       code = `crd.EA.CAESEJA02101WkbOq-gU-D1rTDkiATE.6mP3WWc3cs7UCBh_lsxEUx4w2K4MJXod4B6gCeuRr_s&state=qFzpqJZt5fayF5E_otnp7DBnyQt9XNkBMbChO5ZTe7Y%3D#_`
//     }
//   }, function(err, res, body) {
//     console.log(body);
//   });
// }

module.exports = {
  getPriceEstimates,
  getRequestEstimate
};


// curl -X POST \
//      -H 'Authorization: Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAKeEGgsouLOVzEUK7UHuBWNsAAAAKzvXzCnZFX3X4HwGMn8jWjEAt8r9DVAD2fi7lWpagsOcEnrb2kIJABtlesagoCvwpsWjMfMU4pjxMtT3a6l0uFxGT8zNReP-RQ5HC8GEWOJBtNtXbUbmARZXaiagXnEN83IDM9farwxCtpJEDAAAAFreq64Mlu5yf2ew9iQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU' \
//      -H 'Accept-Language: en_US' \
//      -H 'Content-Type: application/json' \
//      -d '{
//        "start_latitude": 37.7752278,
//        "start_longitude": -122.4197513,
//        "end_latitude": 37.7773228,
//        "end_longitude": -122.4272052
//      }' "https://api.uber.com/v1.2/requests/estimate"

//auth code
//crd.EA.CAESEJA02101WkbOq-gU-D1rTDkiATE.6mP3WWc3cs7UCBh_lsxEUx4w2K4MJXod4B6gCeuRr_s&state=qFzpqJZt5fayF5E_otnp7DBnyQt9XNkBMbChO5ZTe7Y%3D#_
