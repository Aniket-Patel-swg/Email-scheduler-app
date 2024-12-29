import PropTypes from 'prop-types';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { EmailSchedulingForm } from './components/forms/emailForm';
import { LoginForm } from './components/forms/loginFrom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

            {/* Protected Routes */}
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <EmailSchedulingForm user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* Default redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Catch all other routes and redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
