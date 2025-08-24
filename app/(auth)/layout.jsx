export const metadata = {
  title: 'SKFSD || LOGIN',
  description: 'South Kolkata Financial Services Division Management System',
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-200 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
