import React, { useState } from 'react';
import { useTasks } from './TaskContext';

export function TaskFormModal({ onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dev');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Tapşırıq adı boş ola bilməz');
      return;
    }

    addTask({
      title,
      category,
      priority,
      status: 'pending'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Yeni Tapşırıq Əlavə Et</h3>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tapşırıq adı..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Dev">Dev</option>
            <option value="QA">QA</option>
            <option value="Design">Design</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Aşağı</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksək</option>
          </select>
          <div className="modal-buttons">
            <button type="submit" className="btn-primary">Əlavə Et</button>
            <button type="button" onClick={onClose} className="btn-secondary">Ləğv Et</button>
          </div>
        </form>
      </div>
    </div>
  );
}
