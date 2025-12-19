import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const navigate = useNavigate();



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/auth/register', formData);
    alert('Registration successful! Please login.');
    navigate('/login');
  } catch (err) {
   
    console.error("Registration Error:", err);
    if (err.response && err.response.data) {
        alert(`Error: ${JSON.stringify(err.response.data.detail)}`);
    } else {
        // Network errors or other issues
        alert("Registration failed. Check console for details.");
    }
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}