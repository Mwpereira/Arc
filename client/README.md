# Arc Client

## General Setup

Create a `.env` file and add the following:

_VUE_APP_MODE=""   
VUE_APP_DOMAIN=""  
VUE_APP_API=""  
VUE_APP_API_LOCAL=""_  

## Cypress Setup

Create a `cypress.env.json` file and add the following:

_"MODE":"",  
"DOMAIN":"",  
"DOMAIN_LOCAL":"",  
"API_LOCAL":"",  
"TEST_EMAIL":"",  
"TEST_USERNAME":"",  
"TEST_PASSWORD":""_  

Before running `test:e2e`, the `serve` script for the client and the `start` script for serverless must already be configured and running.

## Jest Setup

Create a `jest.config.js` file and add the following:

_"TEST_EMAIL": "",
"TEST_USERNAME": "",
"TEST_PASSWORD": ""_
