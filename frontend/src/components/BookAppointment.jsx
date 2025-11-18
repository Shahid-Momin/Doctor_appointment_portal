import { useState } from "react";

export default function BookAppointment({ doctor, onBack, onSuccess }) {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    if (!patientName || !date || !time) {
      setMsg("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          doctorId: doctor.id,
          date,
          time
        })
      });
      const data = await res.json();

      if (data.error) setMsg(data.error);
      else {
        onSuccess({
          patientName,
          doctorName: doctor.name,
          date,
          time
        });
      }

    } catch (err) {
      console.error(err);
      setMsg("Network error.");
    }
  };

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 8 }}>⬅ Back</button>

      <div className="doctor-card">
        <h3>Book with {doctor.name}</h3>
        <input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <button onClick={submit} style={{ width: "100%", marginTop: 8 }}>Confirm Appointment</button>

        {msg && <div style={{ marginTop: 8, color: msg.includes("✓") ? "green" : "red" }}>{msg}</div>}
      </div>
    </div>
  );
}
