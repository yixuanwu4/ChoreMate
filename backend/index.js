const express = require('express');
const app = express();
const PORT = 4001;
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

app.get('/', (req, res) => {
  res.send('Good job Schnappi! Here is the SweatLog backend!');
});

app.use(express.json());

app.post('/api/logs', (req, res) => {
  try {
    const logPaths = path.join(__dirname, '/data/sportslogs.json');
    const currentLogs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));

    const {sport, date} = req.body;
    const id = uuidv4();
    const newLog = {id, sport, date};

    const updatedLogs = [...currentLogs, newLog];
    fs.writeFileSync(path.join(__dirname, '/data/sportslogs.json'), JSON.stringify(updatedLogs, null, 2));
    res.send(`Saved ${sport} on ${date}! Cool Schnappi!`);
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).send('Failed to save log');
  }
})

app.delete('/api/logs/:id', (req, res) => {
  try {
    console.log('Received delete request for ID: ', req.params.id);
    const id = req.params.id;
    const logPaths = path.join(__dirname, '/data/sportslogs.json');
    const currentLogs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));
    console.log('All IDs: ', currentLogs.map(log => log.id));

    const updatedLogs = currentLogs.filter(log => String(log.id) !== String(id));
    fs.writeFileSync(logPaths, JSON.stringify(updatedLogs, null, 2));
    res.send(`Deleted log with ID ${id}`);
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).send('Failed to delete log');
  }
})

app.get('/api/logs', (req, res) => {
  const logPaths = path.join(__dirname, '/data/sportslogs.json');
  const logs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));
  res.json({logs});
})

app.listen(PORT, () => {
  console.log(`SweatLog backend is running on http:((localhost:${PORT} :3`);
});

