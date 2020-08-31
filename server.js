const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var request = require("request");
let AccessKey = require("./client/src/components/data/access_key.json");
var fs = require("fs");
const eg001 = require('./embeddedsigning');

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

app.get("/callback", (req) => {
  console.log(req.query.code);
  if (req.query.code !== "undefined") {
    console.log(req.query.code);
    var formBody = "grant_type=authorization_code&code=" + req.query.code;
    var options_docutoken = {
      uri: "https://account-d.docusign.com/oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic ZTQzYjFhM2QtOTFhMy00ZWQyLTk2OWQtZDAwZGRhMzE4NWJhOmNlZWNhNDZhLTJkMjItNGQ4OC04MWM3LTgzNTMzMjNlNjg0NQ==",
      },
      body: formBody,
    };
    request(options_docutoken, function (error, response) {
      if (error) throw new Error(error);

      var options_getUser = {
        uri:"https://account-d.docusign.com/oauth/userinfo",
        method: "GET",
        headers: {
          "Authorization":
            "Bearer " + response.body.access_token,
        }};
        request(options_getUser, function(error, response){
          if (error) throw new Error(error);

          console.log(response.body);
        })
    });
  }
})
.get('/eg001', eg001.getController)
.post('/eg001', eg001.createController)
.get('/ping',(req)=>console.log(req))
.get('/return',(req)=>console.log(req))
.post('/ping',(req,res)=>console.log(req,res))
.post('/return',(req,res)=>console.log(req,res))


var expTime = new Date(AccessKey.newTime);
var now = new Date();
var timeDiff = expTime - now;

var options = {
  method: "POST",
  url:
    "https://login.microsoftonline.com/d46065f1-dde7-4863-a215-658f3a353e76/oauth2/token?",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie:
      "fpc=AqTS5zp88KhKmVKLXhKV8ELnwQtBAQAAAMEE3dYOAAAA; x-ms-gateway-slice=prod; stsservicecookie=ests",
  },
  form: {
    resource: "https://org60ab6.api.crm3.dynamics.com",
    client_id: "eda03d70-d8a1-47f6-ac1f-50b5e5825716",
    grant_type: "password",
    username: "aryanmisra@aryanmisra.onmicrosoft.com",
    Password: "Pirate@12345",
    client_secret: "hfG8_5E-RJqi.8FVnakLXz2_sAPZ90Vu-6",
  },
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  if (timeDiff < 0) {
    console.log("requesting new token!");

    request(options, function (error, response) {
      if (error) throw new Error(error);

      console.log(response.body);
      var newTime = new Date(Date.now() + 3600000);
      var NewAccessKey = { newTime: newTime };
      NewAccessKey.data = JSON.parse(response.body);

      console.log(newTime, expTime, now);

      fs.writeFile(
        "./client/src/components/data/access_key.json",
        JSON.stringify(NewAccessKey),
        "utf8",
        function (err) {
          if (err) throw err;
          console.log("complete");
        }
      );
    });
  }
});
