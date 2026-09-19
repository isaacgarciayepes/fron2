

export default function MainLayout() {
  return (
<div className="flex flex-col min-h-screen bg-gray-50">
  

  {/* Contenido dinámico dividido en dos */}
  <main className="flex-grow flex flex-col md:flex-row w-full">
    {/* Lado izquierdo */}
    <div className="flex-1 bg-indigo-700 text-white flex items-center justify-center p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        "El futuro pertenece a quienes creen en la belleza de sus sueños."
      </h2>
    </div>

    {/* Lado derecho */}
    <div className="flex-1 bg-emerald-600 text-white flex items-center justify-center p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden."
      </h2>
    </div>
  </main>
</div>
  );
}