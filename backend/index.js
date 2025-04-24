const express = require('express');
const app = express();
const PORT = 4001;
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

app.get('/', (req, res) => {
  res.send('Good job Schnappi! Here is the ChoreMate backend!');
});

app.use(express.json());

app.post('/api/logs', (req, res) => {
  try {
    const logPaths = path.join(__dirname, '/data/houseworkslogs.json');
    const currentLogs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));

    const {housework, date, person} = req.body;
    const id = uuidv4();
    const newLog = {id, housework, date, person};

    const updatedLogs = [...currentLogs, newLog];
    fs.writeFileSync(path.join(__dirname, '/data/houseworkslogs.json'), JSON.stringify(updatedLogs, null, 2));
    res.send(`Saved ${housework} on ${date}! Cool Schnappi!`);
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).send('Failed to save log');
  }
})

app.delete('/api/logs/:id', (req, res) => {
  try {
    console.log('Received delete request for ID: ', req.params.id);
    const id = req.params.id;
    const logPaths = path.join(__dirname, '/data/houseworkslogs.json');
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

app.patch('/api/logs/:id', (req, res) => {
  try {
    const id = req.params.id;
    const logPaths = path.join(__dirname, '/data/houseworkslogs.json');
    const currentLogs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));

    const {housework, date, person} = req.body;
    const updatedLogs = currentLogs.map(log => {
      if (String(log.id) === String(id)) {
        return {...log, housework, date, person};
      }
      return log;
    });
    fs.writeFileSync(logPaths, JSON.stringify(updatedLogs, null, 2));
    res.send(`Updated log with ID ${id}`);
  } catch (error) {
    console.error('Error updating log:', error);
    res.status(500).send('Failed to update log');
  }
})

app.get('/api/logs', (req, res) => {
  const logPaths = path.join(__dirname, '/data/houseworkslogs.json');
  const logs = JSON.parse(fs.readFileSync(logPaths, 'utf8'));
  res.json({logs});
})

app.listen(PORT, () => {
  console.log(`ChoreMate backend is running on http:((localhost:${PORT} :3`);
});

