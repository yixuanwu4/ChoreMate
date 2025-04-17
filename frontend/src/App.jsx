import { useState } from 'react'
import './App.css'

function App() {
  const [housework, setHousework] = useState('Vacuum Floor');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({housework, date})
      });
      alert(await response.text());
    } catch (error) {
      alert('Failed to save: ' + error);
    }
  };

  const handleShowHistory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setHistory(data.logs);
      setShowHistory(true);
    } catch (error) {
      alert('Failed to fetch logs: ' + error);
    }
  }

  const handleDelete = async (id, e) => {
    // e.preventDefault();

    try {
      const response = await fetch(`/api/logs/${id}`, {
        method: 'DELETE'
      });
      const result = await response.text();
      if (response.ok) {
        setHistory(prev => prev.filter(log => log.id !== id));
        alert(result);
      } else {
        alert('Failed to delete log: ' + result);
      }
    } catch (error) {
      alert('Failed to delete log: ' + error);
    }
  }

  const handleEdit = async (id) => {
    const logToEdit = history.find(log => log.id === id);
    if (logToEdit) {
      setHousework(logToEdit.housework);
      setDate(logToEdit.date);
      setHistory(prev => prev.filter(log => log.id !== id));
    }
  }

  return (
    <div className="App">
      <h1>ChoreMate</h1>
      <form onSubmit={handleSubmit}>
        <select value={housework} onChange={(e) => setHousework(e.target.value)}>
          <option value="Vacuum Floor">Vacuum Floor</option>
          <option value="Washing Clothes">Washing Clothes</option>
          <option value="Folding Clothes">Folding Clothes</option>
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Save</button>
      </form>

      <button type="button" onClick={handleShowHistory}>Show History</button>
        {showHistory && (<table className="log-table" >
          <thead>
            <tr>
              <th>Housework</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((log, index) => (
              <tr key={index}>
                <td>{log.housework}</td>
                <td>{log.date}</td>
                <td>
                  <button onClick={() => handleEdit(log.id)}>Edit</button>
                  <button type="button" onClick={(e) => handleDelete(log.id, e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App
