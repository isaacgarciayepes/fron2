function StudentsTable({ students, onEdit, onDelete }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-4">Nombres</th>
          <th className="p-4">Apellido</th>
          <th className="p-4">Correo</th>
          <th className="p-4">Celular</th>
          <th className="p-4">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
          <tr key={student.studentid} className="border-t">
            <td className="p-4">{student.firstName}</td>
            <td className="p-4">{student.lastName}</td>
            <td className="p-4">{student.email}</td>
            <td className="p-4">{student.phone_number}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentsTable;