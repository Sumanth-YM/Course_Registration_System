import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses/');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/enrollments/${courseId}`);
      alert('Enrolled successfully!');
      fetchCourses(); // Refresh to update seat counts
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to enroll');
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses(courses.filter(c => c.id !== courseId));
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-blue-700">{course.course_code}</h3>
              <span className={`px-2 py-1 text-xs rounded ${course.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {course.is_open ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
            <p className="text-gray-600 mb-1">Instructor: {course.instructor}</p>
            <p className="text-gray-600 mb-4">Credits: {course.credits}</p>
            <div className="text-sm text-gray-500 mb-4">
              Seats: {course.enrollment_count} / {course.max_seats}
            </div>

            {user?.role === 'student' && course.is_open && (
              <button 
                onClick={() => handleEnroll(course.id)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Enroll
              </button>
            )}

            {user?.role === 'admin' && (
              <button 
                onClick={() => handleDelete(course.id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Delete Course
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}