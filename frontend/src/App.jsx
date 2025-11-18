import { useEffect, useState } from "react";
import DoctorList from "./components/DoctorList";
import BookAppointment from "./components/BookAppointment";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [view, setView] = useState("list"); // 'list' | 'book' | 'history' | 'success'
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((r) => r.json())
      .then(setDoctors)
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>Doctor Appointment Portal</h2>

      {/* Hide top buttons on success page */}
      {view !== "success" && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
          <button onClick={() => { setView("list"); setSelectedDoctor(null); }}>Doctors</button>
          <button onClick={() => setView("history")}>Appointment History</button>
        </div>
      )}

      {view === "list" && !selectedDoctor && (
        <DoctorList
          doctors={doctors}
          onSelect={(d) => {
            setSelectedDoctor(d);
            setView("book");
          }}
        />
      )}

      {view === "book" && selectedDoctor && (
        <BookAppointment
          doctor={selectedDoctor}
          onBack={() => {
            setSelectedDoctor(null);
            setView("list");
          }}
          onSuccess={(info) => {
            setLatestBooking(info);
            setView("success");
          }}
        />
      )}

      {view === "history" && <History />}

      {view === "success" && (
        <SuccessPage
          booking={latestBooking}
          onHome={() => setView("list")}
        />
      )}
    </div>
  );
}

// -------------------------------------------------
// SUCCESS PAGE (NEW)
// -------------------------------------------------
function SuccessPage({ booking, onHome }) {
  return (
    <div
      style={{
        marginTop: 30,
        textAlign: "center",
        padding: "40px",
        background: "white",
        borderRadius: 12,
        width: "60%",
        margin: "auto",
        boxShadow: "0 0 15px #ddd"
      }}
    >
      <h1 style={{ color: "green" }}>🎉 Appointment Booked Successfully!</h1>

      <h3 style={{ marginTop: 20 }}>Patient: {booking.patientName}</h3>
      <p>Doctor: {booking.doctorName}</p>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>

      <button
        onClick={onHome}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          borderRadius: 6,
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
}

// -------------------------------------------------
// HISTORY PAGE (your existing one — unchanged)
// -------------------------------------------------
function History() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);

  const load = (name = "") => {
    const url = name
      ? `http://localhost:5000/appointments/search?patientName=${encodeURIComponent(
          name
        )}`
      : "http://localhost:5000/appointments";

    fetch(url)
      .then((r) => r.json())
      .then(setList)
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h3>Your Appointment History</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Search by patient name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => load(q)}>Search</button>
        <button
          onClick={() => {
            setQ("");
            load();
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {list.length === 0 && <p>No appointments found.</p>}
        {list.map((a) => (
          <div
            key={a.id}
            style={{
              padding: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              marginBottom: 8
            }}
          >
            <div>
              <strong>{a.patientName}</strong> — {a.doctorName}
            </div>
            <div>
              {a.date} at {a.time}
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Booked: {new Date(a.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
