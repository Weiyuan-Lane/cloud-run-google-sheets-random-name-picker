'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const { google } = require('googleapis'); 
const sheets = google.sheets('v4');
const express = require('express');
const path = require('path');
const client = require(path.resolve('src/auth/google-client'));
const secrets = require(path.resolve('src/config/secrets'));
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/sheets-sync', async function(req, res) {
  const googleClient = await client.getClientAsync();
  const sid = req.body.sid;
  const scol = req.body.scol;
  const sname = req.body.sname;

  sheets.spreadsheets.values.get({
    auth: googleClient,
    spreadsheetId: sid,
    range: `'${sname}'!${scol}2:${scol}`,
  }, (_, apiRes) => {
    const rows = apiRes.data.values || [];
    const names = rows.map(element => {
      return element[0];
    })
    return res.json(names);
  });
});

app.get('/debug', async function(_, res) {
  const secretOne = await secrets.getValueAsync(secrets.SECRET_KEYS.DEBUG_SECRET_ONE);
  const secretTwo = await secrets.getValueAsync(secrets.SECRET_KEYS.DEBUG_SECRET_TWO);

  res.json({
    secretOne,
    secretTwo,
  });
})

app.get('', async function(_, res) {
  res.render('index', {
    sa: process.env.GOOGLE_SERVICE_ACCOUNT,
  })
});

app.listen(8080);