const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Good job Schnappi! Here is the SweatLog backend!');
});

app.listen(PORT, () => {
  console.log(`SweatLog backend is running on http:((localhost:${PORT} :3`);
});

