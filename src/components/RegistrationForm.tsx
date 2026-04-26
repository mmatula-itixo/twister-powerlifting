import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationDataInput, type RegistrationDataOutput } from '../lib/schemas.ts';


export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationDataOutput | null>(null);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationDataInput, unknown, RegistrationDataOutput>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationDataOutput) => {
    setServerError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      setServerError(typeof json.error === 'string' ? json.error : 'Něco se pokazilo.');
    } else {
      setSubmittedData(data);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setSubmittedData(null);
  };

  if (submitted && submittedData) {
    return (
      <div className="reg-wrapper">
        <div className="reg-card reg-success">
          <div className="reg-success-icon">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="reg-success-title">Registrace úspěšná!</h1>
          <p className="reg-success-msg">
            Děkujeme za registraci, <strong>{submittedData.fullName}</strong>!
          </p>
          <p className="reg-success-sub">
            Tvá registrace na Twister Cup 2026 byla úspěšná.
            Potvrzovací e-mail bude zaslán na <strong>{submittedData.email}</strong> s bližšími detaily.
          </p>
          <button className="reg-reset-btn" onClick={handleReset}>
            Registrace dalšího soutěžicího
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-wrapper">
      <div className="reg-card">
        <div className="reg-header">
          <div className="reg-badge">Zaber si své místo</div>
          <h1 className="reg-title">Registrace na soutěž</h1>
          <p className="reg-subtitle">
            Vyplň následující formulář k registraci na Twister Cup 2026
          </p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="reg-field">
            <label htmlFor="fullName">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Celé jméno <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="text"
              id="fullName"
              placeholder="Napiš celé jméno"
              {...register('fullName')}
            />
            {errors.fullName && <p className="reg-error">{errors.fullName.message}</p>}
          </div>

          <div className="reg-field">
            <label htmlFor="age">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Věk <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="number"
              id="age"
              min="15"
              max="90"
              placeholder="Napiš svůj věk"
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && <p className="reg-error">{errors.age.message}</p>}
          </div>

          <div className="reg-field">
            <label htmlFor="email">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-mail <span className="req">*</span>
            </label>
            <input
              className="reg-input"
              type="email"
              id="email"
              placeholder="tvuj@email.cz"
              {...register('email')}
            />
            {errors.email && <p className="reg-error">{errors.email.message}</p>}
          </div>

          <div className="reg-field">
            <label htmlFor="gender">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Pohlaví <span className="req">*</span>
            </label>
            <select
              className="reg-select"
              id="gender"
              {...register('gender')}
            >
              <option value="">Vyber pohlaví</option>
              <option value="male">Muž</option>
              <option value="female">Žena</option>
            </select>
            {errors.gender && <p className="reg-error">{errors.gender.message}</p>}
          </div>

          <div className="reg-notice">
            <div className="reg-notice-inner">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Důležité:</strong> Registrace končí k 25. 6. 2026.
                <br/>Nezapomeň si projít pravidla soutěže před registrací.
              </p>
            </div>
          </div>

          {serverError && <p className="reg-error">{serverError}</p>}

          <button type="submit" className="reg-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Potvrzuji…' : 'Potvrdit registraci'}
          </button>
        </form>
      </div>
    </div>
  );
}
