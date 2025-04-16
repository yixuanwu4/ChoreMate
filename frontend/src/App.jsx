import { useState } from 'react'
import './App.css'

function App() {
  const [sport, setSport] = useState('running');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({sport, date})
      });
      alert(await response.text());
    } catch (error) {
      alert('Failed to save: ' + error);
    }
  };

  return (
    <div className="App">
      <h1>SweatLog</h1>
      <form onSubmit={handleSubmit}>
        <select value={sport} onChange={(e) => setSport(e.target.value)}>
          <option value="running">Running</option>
          <option value="belly">Belly Training</option>
          <option value="yoga">Yoga</option>
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App
