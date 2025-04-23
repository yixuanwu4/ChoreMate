import { useState } from "react";
import "./App.css";
import LogForm from "./components/LogForm";
import HouseworkFields from "./components/HouseworkFields";
import LogTable from "./components/LogTable";

function App() {
  const [housework, setHousework] = useState("Vacuum Floor");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleShowHistory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logs");
      const data = await response.json();
      setHistory(data.logs);
      setShowHistory(true);
    } catch (error) {
      alert("Failed to fetch logs: " + error);
    }
  };

  const handleDelete = async (id) => {
    // e.preventDefault();

    try {
      const response = await fetch(`/api/logs/${id}`, {
        method: "DELETE",
      });
      const result = await response.text();
      if (response.ok) {
        setHistory((prev) => prev.filter((log) => log.id !== id));
        alert(result);
      } else {
        alert("Failed to delete log: " + result);
      }
    } catch (error) {
      alert("Failed to delete log: " + error);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`/api/logs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          housework,
          date,
        }),
      });
      alert(await response.text());
      setEditId(null);

      const refreshResponse = await fetch("/api/logs");
      const data = await refreshResponse.json();
      setHistory(data.logs);
    } catch (error) {
      alert("Failed to save: " + error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleFormSubmit = async ({ housework, date, editId }) => {
    // e.preventDefault();
    try {
      if (editId) {
        await fetch(`/api/logs/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ housework, date }),
        });
      } else {
        await fetch("/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ housework, date }),
        });
      }
      const refreshResponse = await fetch("/api/logs");
      const data = await refreshResponse.json();
      setHistory(data.logs);

      setEditId(null);
    } catch (error) {
      alert("Failed to save: " + error);
    }
  };

  return (
    <div className="App">
      <h1>ChoreMate</h1>
      <LogForm
        onSubmit={handleFormSubmit}
        defaultHousework={housework}
        defaultDate={date}
      />

      <button type="button" onClick={handleShowHistory}>
        Show History
      </button>
      {showHistory && (
        <LogTable
          history={history}
          showHistory={showHistory}
          editId={editId}
          date={date}
          setDate={setDate}
          housework={housework}
          setHousework={setHousework}
          onEdit={(log) => {
            setEditId(log.id);
            setHousework(log.housework);
            setDate(log.date);
          }}
          onDelete={handleDelete}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
