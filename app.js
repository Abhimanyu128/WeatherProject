//jshint esversion:8

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 3000;

app.get("/", function(req, res) {
  // res.send("Server is up and running!")
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const apiKey = "4839d12fbc04437894a7531fedbea07f";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  https.get(url, function(response) {
    //console.log(response.statusCode);

    response.on("data", function(data) {
      // console.log(data);
      const weatherData = JSON.parse(data);
      //console.log(weatherData.cod);

      // if (weatherData.cod === 200) {
      //   const temp = weatherData.main.temp;
      //   // console.log(temp);
      //   const icon = weatherData.weather[0].icon;
      //   const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //   const weatherDescription = weatherData.weather[0].description;
      //   // console.log(weatherDescription);
      //
      //   res.write(`<h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>`);
      //   res.write("<h3>The weather description is currently " + weatherDescription + ".</h3>");
      //   res.write(`<img src=${imgURL}>`);
      //   res.send();
      // } else {
      //   res.send(`<h1>${weatherData.message}</h1>`);
      // }

      const x = async (weatherData)=>{
        try {
          const temp = await weatherData.main.temp;
          // console.log(temp);
          const icon = await weatherData.weather[0].icon;
          const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          const weatherDescription = await weatherData.weather[0].description;
          // console.log(weatherDescription);

          res.write(`<h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>`);
          res.write("<h3>The weather description is currently " + weatherDescription + ".</h3>");
          res.write(`<img src=${imgURL}>`);
          res.send();
        } catch (e) {
          res.send("Not a valid city");
        }
      };

    });
  });

});

app.listen(port, function() {
  console.log("Server is running on port " + port);
});
