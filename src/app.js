const express = require("express");
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello From Server!')
})

app.get('/test', (req, res) => {
  res.send('Hello From Test Server!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
