import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'E-poçt tələb olunur';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Düzgün e-poçt daxil edin';
    }

    if (!password) {
      newErrors.password = 'Şifrə tələb olunur';
    } else if (password.length < 6) {
      newErrors.password = 'Şifrə ən az 6 simvol olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>TaskFlow Pro - Daxil Ol</h2>
        {apiError && <div className="alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>E-poçt Unvanı</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
              placeholder="demo@devjoint.io"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
              placeholder="Devjoint2026!"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-submit">
            Sistemə Giriş
          </button>
        </form>
      </div>
    </div>
  );
}
