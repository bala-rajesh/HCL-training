import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    subject1: '',
    subject2: '',
    subject3: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8080/api/students';

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch students. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.subject1 || !formData.subject2 || !formData.subject3) {
      alert('Please fill in all fields');
      return;
    }

    const studentData = {
      name: formData.name,
      subject1: parseInt(formData.subject1),
      subject2: parseInt(formData.subject2),
      subject3: parseInt(formData.subject3)
    };

    try {
      setLoading(true);
      if (editingId) {
        // Update existing student
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData)
        });
        alert('Student updated successfully!');
      } else {
        // Create new student
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData)
        });
        alert('Student created successfully!');
      }

      // Reset form and refresh list
      setFormData({ name: '', subject1: '', subject2: '', subject3: '' });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      subject1: student.subject1,
      subject2: student.subject2,
      subject3: student.subject3
    });
    setEditingId(student.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      setLoading(true);
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      alert('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ name: '', subject1: '', subject2: '', subject3: '' });
    setEditingId(null);
  };

  // Get grade color - monochromatic blue palette
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#60a5fa'; // Light Blue
      case 'B': return '#3b82f6'; // Bright Blue
      case 'C': return '#1d4ed8'; // Dark Blue
      default: return '#94a3b8'; // Muted Slate
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1> Student Records </h1>
          <p>Track student performance with automatic grade calculation</p>
        </header>

        {/* Student Form */}
        <div className="form-card">
          <h2>{editingId ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="subjects-grid">
              <div className="form-group">
                <label htmlFor="subject1">Subject 1 Marks</label>
                <input
                  type="number"
                  id="subject1"
                  name="subject1"
                  value={formData.subject1}
                  onChange={handleChange}
                  placeholder="0-100"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject2">Subject 2 Marks</label>
                <input
                  type="number"
                  id="subject2"
                  name="subject2"
                  value={formData.subject2}
                  onChange={handleChange}
                  placeholder="0-100"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject3">Subject 3 Marks</label>
                <input
                  type="number"
                  id="subject3"
                  name="subject3"
                  value={formData.subject3}
                  onChange={handleChange}
                  placeholder="0-100"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Processing...' : editingId ? '💾 Update Student' : '➕ Add Student'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Students List */}
        <div className="students-section">
          <h2>📋 All Students ({students.length})</h2>

          {loading && <p className="loading">Loading...</p>}

          {!loading && students.length === 0 && (
            <p className="empty-state">No students found. Add your first student above!</p>
          )}

          <div className="students-grid">
            {students.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <h3>{student.name}</h3>
                  <div
                    className="grade-badge"
                    style={{ backgroundColor: getGradeColor(student.grade) }}
                  >
                    Grade {student.grade}
                  </div>
                </div>

                <div className="student-details">
                  <div className="detail-row">
                    <span className="label">Student ID:</span>
                    <span className="value">#{student.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Subject 1:</span>
                    <span className="value">{student.subject1}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Subject 2:</span>
                    <span className="value">{student.subject2}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Subject 3:</span>
                    <span className="value">{student.subject3}</span>
                  </div>
                  <div className="detail-row total">
                    <span className="label">Total Marks:</span>
                    <span className="value">{student.total}/300</span>
                  </div>
                  <div className="detail-row average">
                    <span className="label">Average:</span>
                    <span className="value">{(student.total / 3).toFixed(2)}%</span>
                  </div>
                </div>

                <div className="student-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(student)}
                    disabled={loading}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(student.id)}
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
