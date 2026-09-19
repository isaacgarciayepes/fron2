import { useState } from "react";
import { createStudent, updateStudent } from "../services/studentService";

const emptyForm = { firstName: "", lastName: "", email: "", birthDate: "", phoneNumber: "" };

function StudentForm({ student, onSuccess, onCancel }) {
  const isEditing = Boolean(student);
  const [formData, setFormData] = useState(() => student ? {
    firstName: student.firstName ?? "", lastName: student.lastName ?? "", email: student.email ?? "",
    birthDate: student.birthDate ?? "", phoneNumber: student.phoneNumber ?? "",
  } : emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setError("Nombre, apellido, correo y celular son obligatorios"); return;
    }
    setLoading(true);
    try {
      const payload = { ...formData, birthDate: formData.birthDate || null };
      const saved = isEditing ? await updateStudent(student.id, payload) : await createStudent(payload);
      onSuccess?.(saved);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800">{isEditing ? "Editar estudiante" : "Nuevo estudiante"}</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[["firstName","Nombre","Nombre del estudiante"],["lastName","Apellido","Apellido del estudiante"],["email","Correo","correo@ejemplo.com"],["phoneNumber","Celular","Número de celular"]].map(([name,label,placeholder]) => (
          <div className="flex flex-col gap-1" key={name}>
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <input type={name === "email" ? "email" : "text"} name={name} value={formData[name]} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeholder} />
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Fecha de nacimiento</label>
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-2">
        {onCancel && <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Cancelar</button>}
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50">{loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar estudiante"}</button>
      </div>
    </form>
  );
}
export default StudentForm;
