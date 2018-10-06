const request = require('request');
const fs = require('fs');

var bearer_token = 'JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAD5Lh4pBgHnaLJy3UqtT3tZsAAAAm5xFeK4992zVvEhItH5YlWdJCtLVONdcdeReLQbLYkHWtZ2yLKFCXY1trc8T3fey0FkzLPobGqFDNzMdNt3DRKgDlhQTdZMSn5CzPZGG2C-Bqlicu-GFfY2IYrHEu48lwNZUaH3xDceO6hU0DAAAAJi4-JxymwhxbPF6_yQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU';

var getPriceEstimates = (start_loc, end_loc, callback) => {
  request({
    url: `https://api.uber.com/v1.2/estimates/price?start_latitude=${start_loc[0]}&start_longitude=${start_loc[1]}&end_latitude=${end_loc[0]}&end_longitude=${end_loc[1]}`,
    json: true,
    headers: {
      Authorization: `Bearer ${bearer_token}`
    }
  }, function(err, res, body) {
    if(err) {
      callback('FUCKING MOTHER OF ERROR!');
    } else {
      callback(undefined, body.prices);
      fs.writeFileSync('prices.json', JSON.stringify(body.prices, undefined, 2));
    }
  });
};

module.exports.getPriceEstimates = getPriceEstimates;
