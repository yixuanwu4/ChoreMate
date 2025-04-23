import HouseworkFields from "./HouseworkFields";

function LogTable({
  history,
  showHistory,
  editId,
  date,
  setDate,
  housework,
  setHousework,
  onEdit,
  onDelete,
  onSave,
  onCancel
}) {
  if (!showHistory) {
    return null;
  }

  return (
    <table className="log-table" >
          <thead>
            <tr>
              <th>Housework</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((log, index) => (
              <tr key={index}>
                {editId === log.id ? (
                  <HouseworkFields housework={housework}
                    setHousework={setHousework}
                    date={date}
                    setDate={setDate}/>
                ) : (
                  <>
                    <td>
                      <span>{log.housework}</span>
                    </td>
                    <td>
                      <span>{log.date}</span>
                    </td>
                  </>
                )}
                <td>
                  {editId === log.id ? (
                    <>
                      <button type="button" onClick={() => onSave(log.id)}>Save</button>
                      <button type="button" onClick={onCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => {
                        onEdit(log);
                      }}>
                        Edit
                      </button>
                      <button type="button" onClick={() => onDelete(log.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default LogTable;