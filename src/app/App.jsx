import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../features/auth/AuthContext';
import { TaskProvider } from '../features/tasks/TaskContext';
import { LoginPage } from '../features/auth/LoginPage';
import { TaskBoard } from '../features/tasks/TaskBoard';
import { ProtectedRoute } from '../components/routes/ProtectedRoute';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<TaskBoard />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
