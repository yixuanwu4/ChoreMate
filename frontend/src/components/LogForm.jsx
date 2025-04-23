import { useState, useEffect } from 'react';
import HouseworkFields from './HouseworkFields';

function LogForm({ onSubmit, defaultHousework = 'Vacuum Floor', defaultDate, isEditing }) {

  const [housework, setHousework] = useState(defaultHousework);
  const [date, setDate] = useState(defaultDate || new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setHousework(defaultHousework);
    setDate(defaultDate || new Date().toISOString().split('T')[0]);
  }, [defaultHousework, defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ housework, date });
  };

  return (
    <form onSubmit={handleSubmit}>
      <HouseworkFields housework={housework} setHousework={setHousework} date={date} setDate={setDate} />
      <button type="submit">Save</button>
    </form>
  );
}

export default LogForm;
