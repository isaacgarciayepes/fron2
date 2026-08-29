import { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import StudentsTable from '../components/StudentsTable';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Header
        title="Estudiantes"
        description="Gestión de estudiantes registrados"
        txtButton="Nuevo estudiante"
      />
      <main className="flex-1 p-4">
        {loading && <p>Cargando estudiantes...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && <StudentsTable students={students} />}
      </main>
      <Footer />
    </div>
  );
}
