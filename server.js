const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var request = require("request");
let AccessKey = require("./client/src/components/data/access_key.json");
var fs = require("fs");
// const eg001 = require('./embeddedsigning');

// Insert API Routes below
const session = require('express-session')  // https://github.com/expressjs/session
    , cookieParser = require('cookie-parser')
    , MemoryStore = require('memorystore')(session) // https://github.com/roccomuso/memorystore
    , DSAuthCodeGrant = require('./lib/DSAuthCodeGrant')
    , passport = require('passport')
    , DocusignStrategy = require('passport-docusign')
    , dsConfig = require('./config/index.js').config
    , commonControllers = require('./lib/commonControllers')
    , flash = require('express-flash')
    , helmet = require('helmet') // https://expressjs.com/en/advanced/best-practice-security.html
    , moment = require('moment')
    , csrf = require('csurf') // https://www.npmjs.com/package/csurf
    , dataSharing = require('./lib/dataSharingEmbeddedSigning')
    , declaration = require('./lib/declarationEmbeddedSigning')
    , cors = require('cors')
    ;


const PORT = process.env.PORT || 5000
    , HOST = process.env.HOST || 'localhost'
    , max_session_min = 180
    , csrfProtection = csrf({ cookie: true })
    ;

let hostUrl = 'http://' + HOST + ':' + PORT
if (dsConfig.appUrl != '' && dsConfig.appUrl != '{APP_URL}') {hostUrl = dsConfig.appUrl}

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet())
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(session({
    secret: dsConfig.sessionSecret,
    name: 'ds-launcher-session',
    cookie: {maxAge: max_session_min * 60000},
    saveUninitialized: true,
    resave: true,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
  })}))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(((req, res, next) => {
    res.locals.user = req.user;
    res.locals.session = req.session;
    res.locals.dsConfig = { ...dsConfig };
    res.locals.hostUrl = hostUrl; // Used by DSAuthCodeGrant#logout
    next()})) // Send user info to views
  .use(flash())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // Add an instance of DSAuthCodeGrant to req
  .use((req, res, next) => {
      req.dsAuthCodeGrant = new DSAuthCodeGrant(req);
      req.dsAuth = req.dsAuthCodeGrant;
      next()
  })

app.get('/ds/login', commonControllers.login)
.get('/ds/callback', () => {
  [dsLoginCB1, dsLoginCB2]
  // sessionStorage.setItem("docusign_loggedin", true);
}) // OAuth callbacks. See below
.get('/ds/mustAuthenticate', commonControllers.mustAuthenticateController)
.get('/ds-return', (req) => {
  // sessionStorage.setItem("docusign_loggedin", true);
  commonControllers.returnController
  if(req.query.event==="signing_complete"){
    request({uri: "http://localhost:3000/frontendsignedin",method:"GET"}, function (error,response){
      if(error) throw new Error(error);

      console.log(response);
    })
  }
})

.use(csrf({ cookie: true })) // CSRF protection for the following routes
.get('/dataSharing', dataSharing.getController)
.post('/dataSharing', dataSharing.createController)
.get('/declaration', declaration.getController)
.post('/declaration', declaration.createController)
.get('/dynamicsLogin', commonControllers.dynamicsLogin )
.post('/refresh', commonControllers.refreshTokenDynamics)
.get("/geocode", commonControllers.geoCode)
;

// app.get("/callback", (req) => {
//   console.log(req.query.code);
//   if (req.query.code !== "undefined") {
//     console.log(req.query.code);
//     var formBody = "grant_type=authorization_code&code=" + req.query.code;
//     var options_docutoken = {
//       uri: "https://account-d.docusign.com/oauth/token",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic ZTQzYjFhM2QtOTFhMy00ZWQyLTk2OWQtZDAwZGRhMzE4NWJhOmNlZWNhNDZhLTJkMjItNGQ4OC04MWM3LTgzNTMzMjNlNjg0NQ==",
//       },
//       body: formBody,
//     };
//     request(options_docutoken, function (error, response) {
//       if (error) throw new Error(error);

//       var options_getUser = {
//         uri:"https://account-d.docusign.com/oauth/userinfo",
//         method: "GET",
//         headers: {
//           "Authorization":
//             "Bearer " + response.body.access_token,
//         }};
//         request(options_getUser, function(error, response){
//           if (error) throw new Error(error);

//           console.log(response.body);
//         })
//     });
//   }
// })
// .get('/eg001', eg001.getController)
// .post('/eg001', eg001.createController)
// .get('/ping',(req)=>console.log(req))
// .get('/return',(req)=>console.log(req))
// .post('/ping',(req,res)=>console.log(req,res))
// .post('/return',(req,res)=>console.log(req,res))

// #!/usr/bin/env node


function dsLoginCB1 (req, res, next) {req.dsAuthCodeGrant.oauth_callback1(req, res, next)}
function dsLoginCB2 (req, res, next) {req.dsAuthCodeGrant.oauth_callback2(req, res, next)}

/* Start the web server */
if (dsConfig.dsClientId && dsConfig.dsClientId !== '{CLIENT_ID}' &&
    dsConfig.dsClientSecret && dsConfig.dsClientSecret !== '{CLIENT_SECRET}') {
    
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

    console.log(`Listening on ${PORT}`);
    console.log(`Ready! Open ${hostUrl}`);
} else {
  console.log(`PROBLEM: You need to set the clientId (Integrator Key), and perhaps other settings as well. 
You can set them in the configuration file config/appsettings.json or set environment variables.\n`);
  process.exit(); // We're not using exit code of 1 to avoid extraneous npm messages.
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete DocuSign profile is serialized
//   and deserialized.
passport.serializeUser  (function(user, done) {done(null, user)});
passport.deserializeUser(function(obj,  done) {done(null, obj)});

// Configure passport for DocusignStrategy
let docusignStrategy = new DocusignStrategy({
    production: dsConfig.production,
    clientID: dsConfig.dsClientId,
    clientSecret: dsConfig.dsClientSecret,
    callbackURL: hostUrl + '/ds/callback',
    state: true // automatic CSRF protection.
    // See https://github.com/jaredhanson/passport-oauth2/blob/master/lib/state/session.js
  },
  function _processDsResult(accessToken, refreshToken, params, profile, done) {
    // The params arg will be passed additional parameters of the grant.
    // See https://github.com/jaredhanson/passport-oauth2/pull/84
    //
    // Here we're just assigning the tokens to the account object
    // We store the data in DSAuthCodeGrant.getDefaultAccountInfo
    let user = profile;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.expiresIn = params.expires_in;
    user.tokenExpirationTimestamp = moment().add(user.expiresIn, 's'); // The dateTime when the access token will expire
    return done(null, user);
  }
);

/**
 * The DocuSign OAuth default is to allow silent authentication.
 * An additional OAuth query parameter is used to not allow silent authentication
 */
if (!dsConfig.allowSilentAuthentication) {
  // See https://stackoverflow.com/a/32877712/64904
  docusignStrategy.authorizationParams = function(options) {
    return {prompt: 'login'};
  }
}
passport.use(docusignStrategy);

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
