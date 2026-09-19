import { useCallback, useEffect, useState } from "react";
import { deleteStudent, getStudents } from "../services/studentService";
import Header from "../components/Header";
import StudentsTable from "../components/StudentsTable";
import StudentForm from "../components/StudentForm";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setStudents(await getStudents()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  const handleSaved = async () => {
    setShowForm(false);
    setEditingStudent(null);
    await loadStudents();
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`¿Eliminar a ${student.firstName} ${student.lastName}?`)) return;
    try { await deleteStudent(student.id); await loadStudents(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div>
      <Header title="Estudiantes" description="Gestión de estudiantes registrados"
        txtButton={showForm ? "Cerrar formulario" : "Nuevo estudiante"}
        onButtonClick={() => { setEditingStudent(null); setShowForm((value) => !value); }} />
      {showForm && <StudentForm key={editingStudent?.id ?? "new"} student={editingStudent}
        onSuccess={handleSaved} onCancel={() => { setShowForm(false); setEditingStudent(null); }} />}
      {loading && <p>Cargando estudiantes...</p>}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!loading && !error && <StudentsTable students={students}
        onEdit={(student) => { setEditingStudent(student); setShowForm(true); }} onDelete={handleDelete} />}
    </div>
  );
}
