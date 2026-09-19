import MenuNavegacion from "./MenuNavegation";

function Sidebar() {
  return (
    <div className="bg-blue-900 w-86 flex flex-col">
      <h1 className="text-white text-2xl p-4">
        Sistema de Gestión Académica
      </h1>

      <div className="flex-1">
        <MenuNavegacion />
      </div>

      <p className="text-white"><strong>Admin</strong></p>
      <p className="text-white">lgoenaga@cesde.net</p>
    </div>
  );
}

export default Sidebar;