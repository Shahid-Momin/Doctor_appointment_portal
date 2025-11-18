import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { doctors } from "./data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APPOINTMENTS_FILE = path.join(__dirname, "appointments.json");

const app = express();
app.use(cors());
app.use(express.json());

// utility: read appointments.json (returns array)
async function readAppointments() {
  try {
    const raw = await fs.readFile(APPOINTMENTS_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    // if file not found, return empty array
    return [];
  }
}

// utility: write appointments array to file
async function writeAppointments(arr) {
  await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(arr, null, 2), "utf-8");
}

// GET doctors
app.get("/doctors", (req, res) => {
  res.json(doctors);
});

// GET all appointments (optional - for admin)
app.get("/appointments", async (req, res) => {
  const list = await readAppointments();
  res.json(list);
});

// POST create appointment
app.post("/appointments", async (req, res) => {
  const { patientName, doctorId, date, time } = req.body;

  if (!patientName || !doctorId || !date || !time) {
    return res.status(400).json({ error: "All fields are required (patientName, doctorId, date, time)" });
  }

  const doctor = doctors.find((d) => d.id === Number(doctorId));
  if (!doctor) {
    return res.status(400).json({ error: "Invalid doctorId" });
  }

  const list = await readAppointments();

  const newAppointment = {
    id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
    patientName,
    doctorId: Number(doctorId),
    doctorName: doctor.name,
    date,
    time,
    createdAt: new Date().toISOString()
  };

  list.push(newAppointment);
  await writeAppointments(list);

  res.json({ message: "Appointment booked", appointment: newAppointment });
});

// GET appointments for a patient (by patientName OR by id) — simple filter
app.get("/appointments/search", async (req, res) => {
  const { patientName } = req.query;
  const list = await readAppointments();
  if (!patientName) return res.json(list);
  const filtered = list.filter((a) => a.patientName.toLowerCase().includes(patientName.toLowerCase()));
  res.json(filtered);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
