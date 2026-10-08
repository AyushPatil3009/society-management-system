"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Header with Society Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20 text-3xl">
            🏢
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Gokuldham Society Portal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to access your flat, committee, or staff panel
          </p>
        </div>

        {/* Demo Quick-Credentials Tip for Devs/Reviewers */}
        <div className="mb-6 p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs text-slate-300">
          <p className="font-semibold text-emerald-400 mb-1">Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
            <div>Admin: <span className="text-slate-200">bhide@gcs.com</span></div>
            <div>Resident: <span className="text-slate-200">jethalal@gcs.com</span></div>
            <div>Staff: <span className="text-slate-200">popatlal@gcs.com</span></div>
            <div>Password: <span className="text-slate-200">password123</span></div>
          </div>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{state.error}</span>
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Registered Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. bhide@gcs.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-lg shadow-emerald-600/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Authenticating with Society DB...</span>
              </>
            ) : (
              <span>Sign In to Portal →</span>
            )}
          </button>
        </form>

        {/* Footer Link for Residents */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            New resident moving in?{" "}
            <Link
              href="/register"
              className="text-emerald-400 hover:text-emerald-300 font-semibold ml-1 transition-colors"
            >
              Request Flat Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}