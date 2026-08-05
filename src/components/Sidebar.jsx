import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="text-xl font-bold text-blue-600 mb-8 px-4">
        Gestión Cursos
      </div>
      <nav className="space-y-2 flex-1">
        <NavLink to="/" className={linkClasses}>Dashboard</NavLink>
        <NavLink to="/students" className={linkClasses}>Students</NavLink>
        <NavLink to="/courses" className={linkClasses}>Courses</NavLink>
        <NavLink to="/enrollments" className={linkClasses}>Enrollments</NavLink>
      </nav>
    </aside>
  );
}
 export default Sidebar