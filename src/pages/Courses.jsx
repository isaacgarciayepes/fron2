import { useCallback, useEffect, useState } from "react";
import { deleteCourse, getCourses } from "../services/courseService";
import Header from "../components/Header";
import CoursesTable from "../components/CoursesTable";
import CourseForm from "../components/CourseForm";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setCourses(await getCourses()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  const handleSaved = async () => {
    setShowForm(false);
    setEditingCourse(null);
    await loadCourses();
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`¿Eliminar el curso ${course.name}?`)) return;
    try { await deleteCourse(course.id); await loadCourses(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div>
      <Header title="Cursos" description="Gestión de cursos disponibles"
        txtButton={showForm ? "Cerrar formulario" : "Nuevo curso"}
        onButtonClick={() => { setEditingCourse(null); setShowForm((value) => !value); }} />
      {showForm && <CourseForm key={editingCourse?.id ?? "new"} course={editingCourse}
        onSuccess={handleSaved} onCancel={() => { setShowForm(false); setEditingCourse(null); }} />}
      {loading && <p>Cargando cursos...</p>}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {!loading && !error && <CoursesTable courses={courses}
        onEdit={(course) => { setEditingCourse(course); setShowForm(true); }} onDelete={handleDelete} />}
    </div>
  );
}
