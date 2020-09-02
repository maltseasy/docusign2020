let AccessKey = require("./client/src/components/data/access_key.json");
var fs = require("fs");
var request = require("request");
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
request(options, function (error, response) {
  if (error) throw new Error(error);

  console.log(response.body);
  var newTime = new Date(Date.now() + 3600000);
  var NewAccessKey = { newTime: newTime };
  NewAccessKey.data = JSON.parse(response.body);

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
