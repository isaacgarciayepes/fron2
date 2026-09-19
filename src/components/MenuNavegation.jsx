import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/students", label: "Estudiantes" },
  { to: "/courses", label: "Cursos" },
  { to: "/enrollments", label: "Inscripciones" },
];

function MenuNavegacion() {
  return (
    <nav className="flex-1">
      <ul className="flex flex-col gap-1 px-4 mt-4">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-white text-blue-900"
                    : "text-white/80 hover:bg-blue-800 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuNavegacion;
