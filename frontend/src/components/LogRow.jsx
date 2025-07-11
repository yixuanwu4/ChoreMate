import HouseworkSelect from "./HouseworkSelect";
import DateInput from "./DateInput";
import Person from "./Person";

function LogRow({
  log,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  housework,
  setHousework,
  date,
  setDate,
  person,
  setPerson
}) {
  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <HouseworkSelect
              value={housework}
              onChange={(e) => setHousework(e.target.value)}
            />
          </td>
          <td>
            <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
          </td>
          <td>
            <Person
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <span>{log.housework}</span>
          </td>
          <td>
            <span>{log.date}</span>
          </td>
          <td>
            <span>{log.person}</span>
          </td>
        </>
      )}
      <td>
        {isEditing ? (
          <>
            <button type="button" onClick={() => onSave(log.id)}>
              Save
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                onEdit(log);
              }}
            >
              Edit
            </button>
            <button type="button" onClick={() => onDelete(log.id)}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}


export default LogRow;
