import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">UniReg System</Link>
        
        <div className="space-x-4">
          {user ? (
            <>
              <span className="opacity-75">Hello, {user.email} ({user.role})</span>
              <Link to="/courses" className="hover:text-blue-200">Catalog</Link>
              
              {user.role === 'student' && (
                <Link to="/my-enrollments" className="hover:text-blue-200">My Courses</Link>
              )}
              
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-blue-200">Dashboard</Link>
              )}
              
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}