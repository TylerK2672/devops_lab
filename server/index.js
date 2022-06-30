const express = require('express');
const path = require('path');

const app = express();

const SERVER_PORT = process.env.PORT || 3005;

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: 'b57323fdf1e941cfbc58ccb980414c40',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.get('/err', (req, res) =>
{
    try {
        badFunction();
    } catch (error) {
        rollbar.error('ya messed up')
    }
})

app.listen(SERVER_PORT, () =>
{
    console.log(`server running on port ${SERVER_PORT}`)
});