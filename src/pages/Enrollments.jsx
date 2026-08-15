

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Bienvenido al Sistema de Gestión de Cursos</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Students" total="50" />
        <StatCard title="Courses" total="12" />
        <StatCard title="Enrollments" total="145" />
      </div>
    </div>
  );
}