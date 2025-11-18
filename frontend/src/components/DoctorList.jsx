export default function DoctorList({ doctors, onSelect }) {
  return (
    <div>
      <h3>Available Doctors</h3>
      {doctors.map(d => (
        <div key={d.id} className="doctor-card">
          <h4>{d.name}</h4>
          <p><strong>Specialization:</strong> {d.specialization}</p>
          <p><strong>Fee:</strong> ₹{d.fee}</p>
          <button onClick={() => onSelect(d)}>Book Appointment</button>
        </div>
      ))}
    </div>
  );
}
