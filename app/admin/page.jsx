export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-red-po">📊 Admin Dashboard</h1>
        <div className="flex gap-3">
          <input
            type="date"
            className="border px-3 py-1 rounded-lg shadow-sm"
          />
          <button className="bg-yellow-po text-black px-4 py-1 rounded font-semibold hover:bg-yellow-po">
            🔒 Lock Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <p className="text-gray-500">Report table will appear here…</p>
      </div>
    </main>
  );
}
