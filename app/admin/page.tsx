/**
 * Admin Dashboard Home Page
 * Displays an overview of the portfolio statistics (placeholder for now).
 */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Placeholder for Stats Cards */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Coming Soon</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Skills</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Coming Soon</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Certificates</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Coming Soon</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
