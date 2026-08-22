import { Link } from "react-router-dom"; // Asegúrate de tener tu import de react-router-dom

function NavMenu() {
  return (
    <nav className="bg-slate-900 text-slate-100 px-6 py-4 shadow-md border-b border-slate-800">
      <ul className="flex items-center space-x-2">
        <li>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white text-slate-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/courses" 
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white text-slate-300"
          >
            Cursos
          </Link>
        </li>
        <li>
          <Link 
            to="/students" 
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white text-slate-300"
          >
            Estudiantes
          </Link>
        </li>
        <li>
          <Link 
            to="/enrollments" 
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white text-slate-300"
          >
            Inscripciones
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;