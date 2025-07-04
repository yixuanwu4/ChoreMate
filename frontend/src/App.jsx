import { useState } from "react";
import "./App.css";
import LogForm from "./components/LogForm";
import LogTable from "./components/LogTable";

function App() {
  const [housework, setHousework] = useState("Vacuum Floor");
  const [person, setPerson] = useState("Robin");
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

  const handleFormSubmit = async ({ housework, date, person, editId }) => {
    // e.preventDefault();
    try {
      if (editId) {
        await fetch(`/api/logs/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ housework, date, person }),
        });
      } else {
        await fetch("/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ housework, date, person }),
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
        defaultPerson={person}
      />

      <button class="button" type="button" onClick={handleShowHistory}>
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
          person={person}
          setPerson={setPerson}
          onEdit={(log) => {
            setEditId(log.id);
            setHousework(log.housework);
            setDate(log.date);
            setPerson(log.person);
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
