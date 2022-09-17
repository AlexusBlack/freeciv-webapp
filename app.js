const fs = require('fs');
const ini = require('ini');
const express = require('express');
const app = express();
const port = 3000;

// Predefined text lines
const msg= ini.parse(fs.readFileSync('./text.properties', 'utf-8'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

const props = {
  buildVersion: '0.0.1',
  fcwDebug: false,
  webglDebug: false,

  gaTrackingId: null,
  trackJsTocken: null,
  googleSigninClientKey: null,
  captchaKey: null
};

app.get('/', (req, res) => {
  res.render('index', {title: 'Homepage', props, msg});
});

app.get('/webclient/', (req, res) => {
  res.render('webclient/index', {title: 'Client', props, msg});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
