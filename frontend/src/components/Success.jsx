import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Appointment Booked!</h1>
        <p>Your appointment has been successfully scheduled.</p>

        <Link to="/" className="back-btn">Go Back to Home</Link>
      </div>
    </div>
  );
}
