function StatCard({ title, total }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <span className="text-3xl font-bold text-gray-800">{total}</span>
    </div>
  );
}

export default StatCard;
