import { useCallback, useEffect, useState } from "react";
import { deleteEnrollment, getEnrollments } from "../services/enrollmentService";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";
import Header from "../components/Header";
import EnrollmentsTable from "../components/EnrollmentsTable";
import EnrollmentForm from "../components/EnrollmentForm";

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [enrollmentData, studentData, courseData] = await Promise.all([
        getEnrollments(), getStudents(), getCourses(),
      ]);
      setEnrollments(enrollmentData);
      setStudents(studentData);
      setCourses(courseData);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleSaved = async () => {
    setShowForm(false);
    setEditingEnrollment(null);
    await loadAll();
  };

  const handleDelete = async (enrollment) => {
    if (!window.confirm("¿Eliminar esta inscripción?")) return;
    try { await deleteEnrollment(enrollment.id); await loadAll(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div>
      <Header title="Inscripciones" description="Gestión de inscripciones a cursos"
        txtButton={showForm ? "Cerrar formulario" : "Nueva inscripción"}
        onButtonClick={() => { setEditingEnrollment(null); setShowForm((value) => !value); }} />
      {showForm && <EnrollmentForm key={editingEnrollment?.id ?? "new"} enrollment={editingEnrollment}
        students={students} courses={courses} onSuccess={handleSaved}
        onCancel={() => { setShowForm(false); setEditingEnrollment(null); }} />}
      {loading && <p>Cargando inscripciones...</p>}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!loading && !error && <EnrollmentsTable enrollments={enrollments} students={students} courses={courses}
        onEdit={(enrollment) => { setEditingEnrollment(enrollment); setShowForm(true); }} onDelete={handleDelete} />}
    </div>
  );
}
