import { useState } from "react";
import { createCourse, updateCourse } from "../services/courseService";

const emptyForm = { code: "", name: "", description: "", maxCapacity: "" };

function CourseForm({ course, onSuccess, onCancel }) {
  const isEditing = Boolean(course);
  const [formData, setFormData] = useState(() => course ? {
    code: course.code ?? "", name: course.name ?? "", description: course.description ?? "", maxCapacity: course.maxCapacity ?? "",
  } : emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    if (!formData.code.trim() || !formData.name.trim() || !formData.description.trim() || Number(formData.maxCapacity) < 1) {
      setError("Código, nombre, descripción y un cupo mayor que 0 son obligatorios"); return;
    }
    setLoading(true);
    try {
      const payload = { ...formData, maxCapacity: Number(formData.maxCapacity) };
      const saved = isEditing ? await updateCourse(course.id, payload) : await createCourse(payload);
      onSuccess?.(saved);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800">{isEditing ? "Editar curso" : "Nuevo curso"}</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Código</label><input type="text" name="code" value={formData.code} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Ej: MAT-101" /></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Nombre</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Nombre del curso" /></div>
        <div className="flex flex-col gap-1 md:col-span-2"><label className="text-sm font-medium text-gray-600">Descripción</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="border rounded-lg px-3 py-2" placeholder="Descripción del curso" /></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-600">Cupo máximo</label><input type="number" min="1" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Ej: 30" /></div>
      </div>
      <div className="flex justify-end gap-3 mt-2">{onCancel && <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Cancelar</button>}<button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50">{loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar curso"}</button></div>
    </form>
  );
}
export default CourseForm;
