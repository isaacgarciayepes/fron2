import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getDashboardStats } from '../services/dashboardService';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Bienvenido al Sistema de Gestión de Cursos</p>

      {loading && <p>Cargando estadísticas...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Students" total={stats.students} />
          <StatCard title="Courses" total={stats.courses} />
          <StatCard title="Enrollments" total={stats.enrollments} />
        </div>
      )}
    </div>
  );
}
