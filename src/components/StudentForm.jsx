import { useState } from "react";
import { createStudent } from "../services/studentService";

function StudentForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    identification: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { firstName, email, identification, phone_number } = formData;
    if (!firstName || !email || !identification || !phone_number) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const [newStudent] = await createStudent(formData);
      setFormData({ firstName: "", email: "", identification: "", phone_number: "" });
      onSuccess?.(newStudent);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-6"
    >
      <h2 className="text-xl font-bold text-gray-800">Nuevo estudiante</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del estudiante"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Identificación</label>
          <input
            type="text"
            name="identification"
            value={formData.identification}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de documento"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Número</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de celular"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-sans disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar estudiante"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
