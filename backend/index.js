const express = require('express');
const app = express();
const PORT = 4001;
const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
  res.send('Good job Schnappi! Here is the SweatLog backend!');
});

app.use(express.json());

let sportsLogs;

try {
  sportsLogs = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/sportslogs.json'), 'utf8'));
} catch (error) {
  console.error('Error reading sports logs:', error);
  sportsLogs = [];
}

app.post('/api/logs', (req, res) => {
  const {sport, date} = req.body;
  sportsLogs.push({sport, date});
  fs.writeFileSync(path.join(__dirname, '/data/sportslogs.json'), JSON.stringify(sportsLogs, null, 2));
  res.send(`Saved ${sport} on ${date}! Cool Schnappi!`);
})

app.get('/api/logs', (req, res) => {
  res.json({logs: sportsLogs});
})

app.listen(PORT, () => {
  console.log(`SweatLog backend is running on http:((localhost:${PORT} :3`);
});

