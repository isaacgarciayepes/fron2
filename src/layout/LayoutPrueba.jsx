import MenuNavegacion from "../components/MenuNavegation";

function LayoutPrueba() {
  return (
    <div className="layout-prueba min-h-screen flex">
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

      <div className="bg-slate-200 flex-1">
        <p>Este es un ejemplo de layout de prueba.</p>
      </div>
    </div>
  );
}

export default LayoutPrueba;
