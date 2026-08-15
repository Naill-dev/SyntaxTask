import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import { useAuth } from '../auth/AuthContext';
import { TaskFormModal } from './TaskFormModal';

export function TaskBoard() {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div className="loader">Tapşırıqlar yüklənir...</div>;
  if (error) return <div className="error-banner">Xəta: {error}</div>;

  return (
    <div className="dashboard-layout">
      <header className="topbar">
        <div className="logo">TaskFlow Pro</div>
        <div className="user-info">
          <span>{user?.name || 'İstifadəçi'}</span>
          <button onClick={logout} className="btn-logout">Çıxış</button>
        </div>
      </header>

      <main className="content">
        <div className="content-header">
          <h2>İdarəetmə Paneli</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn-add">
            + Yeni Tapşırıq
          </button>
        </div>

        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className={`task-card priority-${task.priority}`}>
              <h3>{task.title}</h3>
              <p>Kateqoriya: {task.category}</p>
              <div className="card-actions">
                <select
                  value={task.status}
                  onChange={(e) => updateTask(task.id, { status: e.target.value })}
                >
                  <option value="pending">Gözləyir</option>
                  <option value="in-progress">Icra olunur</option>
                  <option value="completed">Tamamlandı</option>
                </select>
                <button onClick={() => deleteTask(task.id)} className="btn-delete">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && <TaskFormModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
