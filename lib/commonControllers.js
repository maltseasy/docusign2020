/**
 * @file
 * This file provides common controllers.
 * @author DocuSign
 */

const fs = require('fs')
    , dsConfig = require('../config/appsettings.json')
    , documentationTopic = 'auth-code-grant-node'
    ;

const commonControllers = exports;
const request = require('request');

let arcgisToken = 'pyPG-10ogWc2YpKD9xyfcbFdEI_3oU__fGQ_QwtBuE17CoQZSL7eidutjXf3CfmVcWFKYRKKtMXewHwrkfeFeiqJ6y3r3VLV7sxNRQShkCTZbtJ3GpeQJbkSpNEZY6xIYgrKn3CXpR5IAm_q_eYu7A..';

/**
 * Home page for this application
 */
commonControllers.indexController = (req, res) => {
    res.render('pages/index', {
        title: "Home",
        documentation: dsConfig.documentation + documentationTopic,
        showDoc: dsConfig.documentation
    });
}

commonControllers.mustAuthenticateController = (req, res) => {
    res.render('pages/ds_must_authenticate', {title: "Authenticate with DocuSign"});
}

commonControllers.login = (req, res, next) => {
    req.dsAuth = req.dsAuthCodeGrant;
    req.dsAuth.login(req, res, next)
}

commonControllers.logout = (req, res) => {
    req.dsAuth.logout(req, res)
}

commonControllers.logoutCallback = (req, res) => {
    req.dsAuth.logoutCallback(req, res)
}

/**
 * Display parameters after DS redirect to the application
 * after an embedded signing ceremony, etc
 * @param {object} req Request object
 * @param {object} res Result object
 */
commonControllers.returnController = (req, res) => {
    let event = req.query && req.query.event,
        state = req.query && req.query.state,
        envelopeId = req.query && req.query.envelopeId;
    res.render('pages/ds_return', {
        title: "Return from DocuSign",
        event: event,
        envelopeId: envelopeId,
        state: state
    });
}

commonControllers.dynamicsLogin = (req, res) => {
    console.log('sending');
    request.post({
        url: 'https://login.microsoftonline.com/c74bf0d2-53ca-4f3d-b2d9-229a8f154473/oauth2/token',
        form: {
            resource: 'https://indrapranesh.crm8.dynamics.com',
            client_id: 'ffd3495b-8ad8-4ffc-a1b2-794d64192a24',
            grant_type: 'password',
            username: 'indrapranesh@indrapranesh.onmicrosoft.com',
            password: 'helloworlD@1',
            client_secret: '.1QL_ZZX6C151ZWl9wMm1_1Ks28P_d~k89'
        }
    },function(err, httpResponse, body) {
        console.log(httpResponse,err, body);
        res.send(body);
    });
}

commonControllers.refreshTokenDynamics = (req,res) => {
    request.post({
        url: 'https://login.microsoftonline.com/c74bf0d2-53ca-4f3d-b2d9-229a8f154473/oauth2/token',
        form: {
                    }
    },function(err, httpResponse, body) {
        console.log(httpResponse,err, body);
        res.send(body);
    });
}

commonControllers.geoCode = (req,res) => {
    request.get({
        url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine='+req.param('address')+'&forStorage=true&f=pjson&token='+arcgisToken
    },function(err, httpResponse, body) {
        console.log(httpResponse,err, body);
        res.send(body);
    }
    )
}

