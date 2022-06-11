import React, { useEffect, useState } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sec = date.getSeconds();

  return (
    <div>
      <span>{pad(hours)}</span>
      <span style={{opacity: sec % 2}}>:</span>
      <span>{pad(minutes)}</span>
    </div>
  );
}

function pad(number: Number): string{
  return number
    .toString()
    .padStart(2, '0');
}

export default Clock;
