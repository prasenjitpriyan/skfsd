export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-red-700">📊 Admin Dashboard</h1>
        <div className="flex gap-3">
          <input
            type="date"
            className="border px-3 py-1 rounded-lg shadow-sm"
          />
          <button className="bg-yellow-400 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-500">
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
