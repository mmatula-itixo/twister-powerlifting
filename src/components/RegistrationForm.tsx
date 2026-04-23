import { useState } from 'react';

interface FormData {
  fullName: string;
  age: string;
  email: string;
  gender: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    email: '',
    gender: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="reg-wrapper">
        <div className="reg-card reg-success">
          <div className="reg-success-icon">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="reg-success-title">Registration Successful!</h1>
          <p className="reg-success-msg">
            Thank you for registering, <strong>{formData.fullName}</strong>!
          </p>
          <p className="reg-success-sub">
            We've received your registration for the Twister Powerlifting Competition 2026.
            A confirmation email will be sent to <strong>{formData.email}</strong> with further details.
          </p>
          <button className="reg-reset-btn" onClick={() => setSubmitted(false)}>
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-wrapper">
      <div className="reg-card">
        <div className="reg-header">
          <div className="reg-badge">Secure Your Spot</div>
          <h1 className="reg-title">Competition Registration</h1>
          <p className="reg-subtitle">
            Fill out the form below to register for the Twister Powerlifting Competition 2026
          </p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="reg-field">
            <label htmlFor="fullName">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="reg-field">
            <label htmlFor="age">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Age <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              placeholder="Enter your age"
            />
          </div>

          <div className="reg-field">
            <label htmlFor="email">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="reg-field">
            <label htmlFor="gender">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Gender <span className="req">*</span>
            </label>
            <select
              className="reg-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="reg-notice">
            <div className="reg-notice-inner">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Important:</strong> Registration closes on June 1, 2026. Make sure to review
                the competition rules before registering.
              </p>
            </div>
          </div>

          <button type="submit" className="reg-submit">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}
