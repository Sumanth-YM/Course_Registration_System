import { useState } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
  const [course, setCourse] = useState({
    course_code: '',
    title: '',
    instructor: '',
    credits: 3,
    max_seats: 30,
    is_open: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses/', course);
      alert('Course created successfully');
      setCourse({
        course_code: '', title: '', instructor: '', credits: 3, max_seats: 30, is_open: true
      });
    } catch (err) {
      alert('Error creating course. Code may already exist.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <input 
            placeholder="Course Code (e.g. CS101)" 
            className="border p-2 rounded"
            value={course.course_code}
            onChange={e => setCourse({...course, course_code: e.target.value})}
            required
          />
          
          <input 
            placeholder="Course Title" 
            className="border p-2 rounded"
            value={course.title}
            onChange={e => setCourse({...course, title: e.target.value})}
            required
          />

          <input 
            placeholder="Instructor" 
            className="border p-2 rounded"
            value={course.instructor}
            onChange={e => setCourse({...course, instructor: e.target.value})}
            required
          />

          <input 
            type="number" 
            placeholder="Credits" 
            className="border p-2 rounded"
            value={course.credits}
            onChange={e => setCourse({...course, credits: parseInt(e.target.value)})}
            required
          />

          <input 
            type="number" 
            placeholder="Max Seats" 
            className="border p-2 rounded"
            value={course.max_seats}
            onChange={e => setCourse({...course, max_seats: parseInt(e.target.value)})}
            required
          />

          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={course.is_open}
                onChange={e => setCourse({...course, is_open: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Open for Registration</span>
            </label>
          </div>

          <button className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}