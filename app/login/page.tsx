import { login } from "@/app/auth/actions";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Login Page Component
 * Renders the login form and handles redirection if user is already authenticated.
 */
export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your portfolio
          </p>
        </div>

        <form action={login} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 pl-10 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 pl-10 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
