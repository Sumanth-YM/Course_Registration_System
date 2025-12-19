import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get('/enrollments/my');
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrop = async (courseId) => {
    if (!window.confirm("Are you sure you want to drop this course?")) return;
    try {
      await api.delete(`/enrollments/${courseId}`);
      setEnrollments(enrollments.filter(e => e.course.id !== courseId));
    } catch (err) {
      alert('Failed to drop course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>
      {enrollments.length === 0 ? (
        <p className="text-gray-500">You are not enrolled in any courses.</p>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-white p-6 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{enrollment.course.course_code}: {enrollment.course.title}</h3>
                <p className="text-gray-600">Credits: {enrollment.course.credits} | Instructor: {enrollment.course.instructor}</p>
              </div>
              <button 
                onClick={() => handleDrop(enrollment.course.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Drop
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}