import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
        {/* Society Guard Badge */}
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          🛡️
        </div>

        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Security Gatekeeper
        </span>

        <h1 className="text-2xl font-bold text-white mt-4 mb-2">
          Restricted Society Area
        </h1>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          You don&apos;t have the required role or authorization to enter this section of the society portal.
        </p>

        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 mb-6 text-xs text-slate-400 text-left space-y-1">
          <p className="font-semibold text-slate-300">Notice from Committee:</p>
          <p>Residents cannot access the Admin panel.</p>
          <p>Staff members cannot access Resident-only facilities.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/login"
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-colors text-center"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}