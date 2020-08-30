const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var request = require('request');
let AccessKey = require('./config/access_key.json');
var fs = require('fs');

// Insert API Routes below

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var expTime = new Date(AccessKey.newTime);
var now = new Date();
var timeDiff = expTime - now;

var options = {
  'method': 'POST',
  'url': 'https://login.microsoftonline.com/d46065f1-dde7-4863-a215-658f3a353e76/oauth2/token?',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'fpc=AqTS5zp88KhKmVKLXhKV8ELnwQtBAQAAAMEE3dYOAAAA; x-ms-gateway-slice=prod; stsservicecookie=ests'
  },
  form: {
    'resource': 'https://org60ab6.api.crm3.dynamics.com',
    'client_id': 'eda03d70-d8a1-47f6-ac1f-50b5e5825716',
    'grant_type': 'password',
    'username': 'aryanmisra@aryanmisra.onmicrosoft.com',
    'Password': 'Pirate@12345',
    'client_secret': 'hfG8_5E-RJqi.8FVnakLXz2_sAPZ90Vu-6'
  }
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  if (timeDiff<0){
    console.log('requesting new token!')
 
    request(options, function (error, response) {
      if (error) throw new Error(error);

      console.log(response.body);
      var newTime = new Date(Date.now()+3600000);
      var NewAccessKey = {"newTime": newTime};
      NewAccessKey.data = response.body;

      console.log(newTime, expTime, now);

      fs.writeFile('./config/access_key.json', JSON.stringify(NewAccessKey), function(err) {
        if (err) throw err;
        console.log('complete');
        })
    });

  }  

});