const express = require('express');
const request = require('request');
const url = require('url');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {

  const queryObject = url.parse(req.url,true).query;
  // console.log(queryObject,"qygbvvjbjjv");
  var lat = queryObject.lat;
  var lon = queryObject.lon;
  request(
    { url: 'http://api.open-notify.org/iss-pass.json?lat='+lat+'&lon=' + lon },
    (error, response, body) => {
      // console.log(error, body, response.statusCode)
      return res.status(response.statusCode).json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

