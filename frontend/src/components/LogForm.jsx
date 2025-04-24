import { useState, useEffect } from "react";
import HouseworkSelect from "./HouseworkSelect";
import DateInput from "./DateInput";
import Person from "./Person";

function LogForm({ onSubmit, defaultHousework = "Vacuum Floor", defaultDate, defaultPerson }) {
  const [housework, setHousework] = useState(defaultHousework);
  const [person, setPerson] = useState("Robin");
  const [date, setDate] = useState(
    defaultDate || new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    setHousework(defaultHousework);
    setPerson(defaultPerson);
    setDate(defaultDate || new Date().toISOString().split("T")[0]);
  }, [defaultHousework, defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ housework, date, person });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <HouseworkSelect
          value={housework}
          onChange={(e) => setHousework(e.target.value)}
        />
        <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
        <Person value={person} onChange={(e) => setPerson(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default LogForm;
