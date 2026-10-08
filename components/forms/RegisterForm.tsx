"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerResidentAction } from "@/actions/register";

type BuildingWithFlats = {
  id: string;
  name: string;
  flats: {
    id: string;
    flatNumber: string;
    occupancyStatus: string;
  }[];
};

export default function RegisterForm({
  buildings,
}: {
  buildings: BuildingWithFlats[];
}) {
  const [state, formAction, isPending] = useActionState(
    registerResidentAction,
    undefined
  );

  // Selected building to filter flats dropdown
  const [selectedBuildingId, setSelectedBuildingId] = useState(
    buildings[0]?.id || ""
  );

  const currentFlats =
    buildings.find((b) => b.id === selectedBuildingId)?.flats || [];

  // If successfully submitted, show the Pending Approval notice
  if (state?.success) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
          ⏳
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Registration Submitted!
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Your request to register has been sent to the Gokuldham society committee.
          Once an administrator verifies and approves your flat occupancy, you will be able to log in.
        </p>

        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 text-left mb-6 space-y-1.5">
          <p className="font-semibold text-emerald-400">Next Steps:</p>
          <p>• The society secretary will review your details.</p>
          <p>• You can sign in using your email & password once approved.</p>
        </div>

        <Link
          href="/login"
          className="inline-block py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-600/20"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20 text-2xl">
          🏡
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Resident Registration
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Apply for flat residency in Gokuldham Co-op Society
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Champaklal Gada"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Email & Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. champak@gcs.com"
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
              placeholder="Min. 6 characters"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Building & Flat Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Building / Wing
            </label>
            <select
              value={selectedBuildingId}
              onChange={(e) => setSelectedBuildingId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm outline-none transition-all"
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Flat
            </label>
            <select
              name="flatId"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white text-sm outline-none transition-all"
            >
              <option value="">-- Choose Flat --</option>
              {currentFlats.map((f) => (
                <option key={f.id} value={f.id}>
                  Flat {f.flatNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resident Type: Owner vs Tenant */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Occupancy Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="radio"
                name="residentType"
                value="OWNER"
                defaultChecked
                className="text-emerald-500 focus:ring-emerald-500/20"
              />
              <span className="text-sm text-slate-200">Owner</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="radio"
                name="residentType"
                value="TENANT"
                className="text-emerald-500 focus:ring-emerald-500/20"
              />
              <span className="text-sm text-slate-200">Tenant</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-lg shadow-emerald-600/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <span>Submit Registration Request →</span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-400">
          Already approved?{" "}
          <Link
            href="/login"
            className="text-emerald-400 hover:text-emerald-300 font-semibold ml-1 transition-colors"
          >
            Sign In Here
          </Link>
        </p>
      </div>
    </>
  );
}
