const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

const props = {
  gaTrackingId: null,
  trackJsTocken: null
};

app.get('/', (req, res) => {
  res.render('index', {props, title: 'Test'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
