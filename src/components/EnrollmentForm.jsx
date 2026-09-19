import { useState } from "react";
import { createEnrollment, updateEnrollment } from "../services/enrollmentService";

const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = (students, courses) => ({
  studentId: students[0]?.id ?? "", courseId: courses[0]?.id ?? "", enrollmentDate: today(), status: "ACTIVE",
});

function EnrollmentForm({ enrollment, students, courses, onSuccess, onCancel }) {
  const isEditing = Boolean(enrollment);
  const [formData, setFormData] = useState(() => enrollment ? {
    studentId: enrollment.studentId ?? "", courseId: enrollment.courseId ?? "", enrollmentDate: enrollment.enrollmentDate ?? today(), status: enrollment.status ?? "ACTIVE",
  } : emptyForm(students, courses));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const noStudents = students.length === 0; const noCourses = courses.length === 0;
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    if (!formData.studentId || !formData.courseId || !formData.enrollmentDate) { setError("Estudiante, curso y fecha son obligatorios"); return; }
    setLoading(true);
    try { const payload = { ...formData, studentId: Number(formData.studentId), courseId: Number(formData.courseId) };
      const saved = isEditing ? await updateEnrollment(enrollment.id, payload) : await createEnrollment(payload); onSuccess?.(saved); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800">{isEditing ? "Editar inscripción" : "Nueva inscripción"}</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(noStudents || noCourses) && <p className="text-amber-600 text-sm">Necesitas al menos un estudiante y un curso antes de crear inscripciones.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Estudiante</label><select name="studentId" value={formData.studentId} onChange={handleChange} className="border rounded-lg px-3 py-2"><option value="" disabled>Selecciona un estudiante</option>{students.map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}</select></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Curso</label><select name="courseId" value={formData.courseId} onChange={handleChange} className="border rounded-lg px-3 py-2"><option value="" disabled>Selecciona un curso</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}</select></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Fecha de inscripción</label><input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} className="border rounded-lg px-3 py-2" /></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Estado</label><select name="status" value={formData.status} onChange={handleChange} className="border rounded-lg px-3 py-2"><option value="ACTIVE">Activa</option><option value="CANCELLED">Cancelada</option></select></div>
      </div>
      <div className="flex justify-end gap-3 mt-2">{onCancel && <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Cancelar</button>}<button type="submit" disabled={loading || noStudents || noCourses} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50">{loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar inscripción"}</button></div>
    </form>
  );
}
export default EnrollmentForm;
