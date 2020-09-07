const express = require("express");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
var request = require("request");
let AccessKey = require("./client/src/components/data/access_key.json");
var fs = require("fs");
const cron = require("node-cron");

// Insert API Routes below
const session = require("express-session"), // https://github.com/expressjs/session
  cookieParser = require("cookie-parser"),
  MemoryStore = require("memorystore")(session), // https://github.com/roccomuso/memorystore
  DSAuthCodeGrant = require("./lib/DSAuthCodeGrant"),
  passport = require("passport"),
  DocusignStrategy = require("passport-docusign"),
  dsConfig = require("./config/index.js").config,
  commonControllers = require("./lib/commonControllers"),
  flash = require("express-flash"),
  helmet = require("helmet"), // https://expressjs.com/en/advanced/best-practice-security.html
  moment = require("moment"),
  csrf = require("csurf"), // https://www.npmjs.com/package/csurf
  dataSharing = require("./lib/dataSharingEmbeddedSigning"),
  declaration = require("./lib/declarationEmbeddedSigning"),
  cors = require("cors");
const PORT = process.env.PORT || 5000,
  HOST = process.env.HOST || "localhost",
  max_session_min = 180,
  csrfProtection = csrf({ cookie: true });
let hostUrl = "https://" + HOST + ":" + PORT;
if (dsConfig.appUrl != "" && dsConfig.appUrl != "{APP_URL}") {
  hostUrl = dsConfig.appUrl;
}

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app
.use(helmet())
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
// Routes
.get('/ds/login', commonControllers.login)
.get('/ds/callback', [dsLoginCB1, dsLoginCB2]) // OAuth callbacks. See below
.get('/ds/mustAuthenticate', commonControllers.mustAuthenticateController)
.get('/ds-return', commonControllers.returnController)
.use(csrf({ cookie: true })) // CSRF protection for the following routes
.get('/dataSharing', dataSharing.getController)
.post('/dataSharing', dataSharing.createController)
.get('/declaration', declaration.getController)
.post('/declaration', declaration.createController)
.get('/dynamicsLogin', commonControllers.dynamicsLogin )
.post('/refresh', commonControllers.refreshTokenDynamics)
.get("/geocode", commonControllers.geoCode)
;

function dsLoginCB1(req, res, next) {
  req.dsAuthCodeGrant.oauth_callback1(req, res, next);
}
function dsLoginCB2(req, res, next) {
  req.dsAuthCodeGrant.oauth_callback2(req, res, next);
}

/* Start the web server */
if (
  dsConfig.dsClientId &&
  dsConfig.dsClientId !== "{CLIENT_ID}" &&
  dsConfig.dsClientSecret &&
  dsConfig.dsClientSecret !== "{CLIENT_SECRET}"
) {

  https.createServer({key:fs.readFileSync('./certs/private.key'),cert:fs.readFileSync('./certs/certificate.crt')}, app).listen(PORT, function() {console.log("Server listening on port "+PORT)});

  console.log(`Listening on ${PORT}`);
  console.log(`Ready! Open ${hostUrl}`);
} else {
  console.log(`PROBLEM: You need to set the clientId (Integrator Key), and perhaps other settings as well. 
You can set them in the configuration file config/appsettings.json or set environment variables.\n`);
  process.exit(); // We're not using exit code of 1 to avoid extraneous npm messages.
}

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Configure passport for DocusignStrategy
let docusignStrategy = new DocusignStrategy(
  {
    production: dsConfig.production,
    clientID: dsConfig.dsClientId,
    clientSecret: dsConfig.dsClientSecret,
    callbackURL: hostUrl + "/ds/callback",
    state: true, // automatic CSRF protection.
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
    user.tokenExpirationTimestamp = moment().add(user.expiresIn, "s"); // The dateTime when the access token will expire
    return done(null, user);
  }
);


if (!dsConfig.allowSilentAuthentication) {
  // See https://stackoverflow.com/a/32877712/64904
  docusignStrategy.authorizationParams = function (options) {
    return { prompt: "login" };
  };
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
