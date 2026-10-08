import { prisma } from "@/lib/prisma";
import RegisterForm from "@/components/forms/RegisterForm";

export default async function RegisterPage() {
  // Fetch all buildings with their flats for the society
  const buildings = await prisma.building.findMany({
    include: {
      flats: {
        orderBy: { flatNumber: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 my-8">
        <RegisterForm buildings={buildings} />
      </div>
    </div>
  );
}