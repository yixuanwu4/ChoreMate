import LogRow from "./LogRow";

function LogTable({
  history,
  showHistory,
  editId,
  person,
  setPerson,
  date,
  setDate,
  housework,
  setHousework,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  if (!showHistory) {
    return null;
  }

  return (
    <table className="log-table">
      <thead>
        <tr>
          <th>Housework</th>
          <th>Date</th>
          <th>Person</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.map((log, index) => (
          <LogRow
      key={index}
      log={log}
      isEditing={editId === log.id}
      housework={housework}
      setHousework={setHousework}
      person={person}
      setPerson={setPerson}
      date={date}
      setDate={setDate}
      onEdit={onEdit}
      onDelete={onDelete}
      onSave={onSave}
      onCancel={onCancel} />
              ))}
      </tbody>
    </table>
  );
}

export default LogTable;
