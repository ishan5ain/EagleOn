const request = require('request');

var options = {
  url: "https://api.uber.com/v1.2/products?latitude=37.7752315&longitude=-122.418075",
  headers: {
    Authorization: 'Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAMnZ9cRGPO2B93TYBjPdPONsAAAA6i8Bf7xCygR40G6NTPc3lJnrR0tWGNi-JrKcGOBALCk5xN0SRp9IqzKyHAVRlSB-IPMdEQmyQlvtHPc-XyM1Y4RpjjiCjQ7N7TohDVd6hEwKOj9Jfn68ay-5Zg0aoJ2GiuCxX3LDkbruuYHUDAAAABR7Y5dry97AvPG4AiQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU',
  }
}
request(options, function(error, res, body) {
    console.log(JSON.stringify(body, undefined, 2));
    // console.log(body);
  });
