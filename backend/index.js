const express = require('express');
const app = express();
const PORT = 4001;

app.get('/', (req, res) => {
  res.send('Good job Schnappi! Here is the SweatLog backend!');
});

app.use(express.json());

let sportsLogs = [];

app.post('/api/logs', (req, res) => {
  const {sport, date} = req.body;
  sportsLogs.push({sport, date});
  res.send(`Saved ${sport} on ${date}! Cool Schnappi!`);
})

app.get('/api/logs', (req, res) => {
  res.json({logs: sportsLogs});
})

app.listen(PORT, () => {
  console.log(`SweatLog backend is running on http:((localhost:${PORT} :3`);
});

