import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseCatalog from './pages/CourseCatalog';
import MyEnrollments from './pages/MyEnrollments';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/courses" replace />} />

            {/* Protected Routes (Authenticated Users) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/courses" element={<CourseCatalog />} />
            </Route>

            {/* Student Only */}
            <Route element={<ProtectedRoute roles={['student']} />}>
              <Route path="/my-enrollments" element={<MyEnrollments />} />
            </Route>

            {/* Admin Only */}
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;