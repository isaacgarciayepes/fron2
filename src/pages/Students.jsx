import { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import StudentsTable from '../components/StudentsTable';
import StudentForm from '../components/StudentForm';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadStudents = () => {
    setLoading(true);
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleCreated = () => {
    setShowForm(false);
    loadStudents();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Header
        title="Estudiantes"
        description="Gestión de estudiantes registrados"
        txtButton="Nuevo estudiante"
        onButtonClick={() => setShowForm((prev) => !prev)}
      />
      <main className="flex-1 p-4">
        {showForm && (
          <StudentForm onSuccess={handleCreated} onCancel={() => setShowForm(false)} />
        )}
        {loading && <p>Cargando estudiantes...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && <StudentsTable students={students} />}
      </main>
      <Footer />
    </div>
  );
}
