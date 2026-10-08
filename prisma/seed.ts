import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  console.log("🌱 Starting seed...");

  // ------------------------------------------------------------------
  // 1. SOCIETY — Gokuldham Co-operative Society
  // ------------------------------------------------------------------
  const society = await prisma.society.upsert({
    where: { code: "GCS" },
    update: {},
    create: {
      name: "Gokuldham Co-operative Society",
      code: "GCS",
      address: "Gokuldam, Film City Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400065",
    },
  });
  console.log(`✅ Society created: ${society.name}`);

  // ------------------------------------------------------------------
  // 2. BUILDINGS
  // ------------------------------------------------------------------
  const towerA = await prisma.building.upsert({
    where: { societyId_name: { societyId: society.id, name: "Tower A" } },
    update: {},
    create: { name: "Tower A", societyId: society.id },
  });

  const towerB = await prisma.building.upsert({
    where: { societyId_name: { societyId: society.id, name: "Tower B" } },
    update: {},
    create: { name: "Tower B", societyId: society.id },
  });
  console.log(`✅ Buildings created: Tower A, Tower B`);

  // ------------------------------------------------------------------
  // 3. FLATS
  // ------------------------------------------------------------------
  const flatData = [
    // Tower A
    { flatNumber: "101", floor: 1, buildingId: towerA.id },
    { flatNumber: "102", floor: 1, buildingId: towerA.id },
    { flatNumber: "201", floor: 2, buildingId: towerA.id },
    { flatNumber: "202", floor: 2, buildingId: towerA.id },
    // Tower B
    { flatNumber: "101", floor: 1, buildingId: towerB.id },
    { flatNumber: "102", floor: 1, buildingId: towerB.id },
  ];

  const flats: Record<string, Awaited<ReturnType<typeof prisma.flat.upsert>>> =
    {};

  for (const flat of flatData) {
    const result = await prisma.flat.upsert({
      where: {
        buildingId_flatNumber: {
          buildingId: flat.buildingId,
          flatNumber: flat.flatNumber,
        },
      },
      update: {},
      create: flat,
    });
    const key = `${flat.buildingId === towerA.id ? "A" : "B"}-${flat.flatNumber}`;
    flats[key] = result;
  }
  console.log(`✅ Flats created: 6 flats across Tower A & Tower B`);

  // ------------------------------------------------------------------
  // 4. USERS — Admin, Residents, Staff
  // ------------------------------------------------------------------
  const hashedPassword = await bcrypt.hash("password123", 12);

  // Admin — Atmaram Bhide (obviously 😄)
  const admin = await prisma.user.upsert({
    where: { email: "bhide@gcs.com" },
    update: {},
    create: {
      name: "Atmaram Bhide",
      email: "bhide@gcs.com",
      passwordHash: hashedPassword,
      phone: "9900000001",
      role: "ADMIN",
      status: "ACTIVE",
      societyId: society.id,
    },
  });
  console.log(`✅ Admin created: ${admin.name} (${admin.email})`);

  // Resident 1 — Jethalal Gada (Owner, Tower A - 101)
  const jethalal = await prisma.user.upsert({
    where: { email: "jethalal@gcs.com" },
    update: {},
    create: {
      name: "Jethalal Champaklal Gada",
      email: "jethalal@gcs.com",
      passwordHash: hashedPassword,
      phone: "9900000002",
      role: "RESIDENT",
      residentType: "OWNER",
      status: "ACTIVE",
      societyId: society.id,
      flatId: flats["A-101"].id,
    },
  });

  // Update flat occupancy
  await prisma.flat.update({
    where: { id: flats["A-101"].id },
    data: { occupancyStatus: "OCCUPIED_OWNER" },
  });
  console.log(`✅ Resident created: ${jethalal.name} → Tower A, Flat 101`);

  // Resident 2 — Taarak Mehta (Owner, Tower A - 201)
  const taarak = await prisma.user.upsert({
    where: { email: "taarak@gcs.com" },
    update: {},
    create: {
      name: "Taarak Mehta",
      email: "taarak@gcs.com",
      passwordHash: hashedPassword,
      phone: "9900000003",
      role: "RESIDENT",
      residentType: "OWNER",
      status: "ACTIVE",
      societyId: society.id,
      flatId: flats["A-201"].id,
    },
  });

  await prisma.flat.update({
    where: { id: flats["A-201"].id },
    data: { occupancyStatus: "OCCUPIED_OWNER" },
  });
  console.log(`✅ Resident created: ${taarak.name} → Tower A, Flat 201`);

  // Resident 3 — Pending Approval (Dr. Hathi is moving in)
  await prisma.user.upsert({
    where: { email: "hathi@gcs.com" },
    update: {},
    create: {
      name: "Dr. Hansraj Hathi",
      email: "hathi@gcs.com",
      passwordHash: hashedPassword,
      phone: "9900000004",
      role: "RESIDENT",
      residentType: "OWNER",
      status: "PENDING_APPROVAL",
      societyId: society.id,
    },
  });
  console.log(`✅ Resident created: Dr. Hathi → PENDING_APPROVAL`);

  // ------------------------------------------------------------------
  // 5. STAFF
  // ------------------------------------------------------------------

  // Staff user account — Popatlal (Plumber 😄)
  const popatlalUser = await prisma.user.upsert({
    where: { email: "popatlal@gcs.com" },
    update: {},
    create: {
      name: "Popatlal Pandey",
      email: "popatlal@gcs.com",
      passwordHash: hashedPassword,
      phone: "9900000005",
      role: "STAFF",
      status: "ACTIVE",
      societyId: society.id,
    },
  });

  const popatlal = await prisma.staff.upsert({
    where: { userId: popatlalUser.id },
    update: {},
    create: {
      name: "Popatlal Pandey",
      phone: "9900000005",
      specialization: "PLUMBING",
      isAvailable: true,
      societyId: society.id,
      userId: popatlalUser.id,
    },
  });
  console.log(`✅ Staff created: ${popatlal.name} (Plumbing)`);

  // ------------------------------------------------------------------
  // 6. SAMPLE COMPLAINT
  // ------------------------------------------------------------------
  const complaint = await prisma.complaint.upsert({
    where: { id: "sample-complaint-001" },
    update: {},
    create: {
      id: "sample-complaint-001",
      title: "Leaking tap in kitchen",
      description:
        "The kitchen tap has been leaking since 3 days. Water is being wasted. Please fix it as soon as possible.",
      category: "PLUMBING",
      priority: "HIGH",
      status: "ASSIGNED",
      societyId: society.id,
      flatId: flats["A-101"].id,
      residentId: jethalal.id,
      assignedStaffId: popatlal.id,
    },
  });

  // Complaint updates (audit trail)
  await prisma.complaintUpdate.createMany({
    skipDuplicates: true,
    data: [
      {
        complaintId: complaint.id,
        authorId: jethalal.id,
        status: "OPEN",
        comment: "Raised complaint. Tap leaking badly.",
      },
      {
        complaintId: complaint.id,
        authorId: admin.id,
        status: "ASSIGNED",
        comment: "Assigned to Popatlal (Plumber). He will visit tomorrow.",
      },
    ],
  });
  console.log(`✅ Sample complaint created with update trail`);

  // ------------------------------------------------------------------
  // 7. SAMPLE NOTICE
  // ------------------------------------------------------------------
  await prisma.notice.upsert({
    where: { id: "sample-notice-001" },
    update: {},
    create: {
      id: "sample-notice-001",
      title: "Society AGM — October 2026",
      content:
        "All residents are requested to attend the Annual General Meeting on 15th October 2026 at 6:00 PM in the Clubhouse. Agenda: Maintenance hike, new security policy, and garden renovation.",
      priority: "IMPORTANT",
      societyId: society.id,
      authorId: admin.id,
    },
  });
  console.log(`✅ Sample notice created`);

  // ------------------------------------------------------------------
  // 8. FACILITY
  // ------------------------------------------------------------------
  await prisma.facility.upsert({
    where: { societyId_name: { societyId: society.id, name: "Clubhouse" } },
    update: {},
    create: {
      name: "Clubhouse",
      description: "Main clubhouse for meetings and events. AC Hall.",
      capacity: 100,
      rules:
        "Booking required 48 hours in advance. No loud music after 10 PM.",
      isAvailable: true,
      societyId: society.id,
    },
  });

  await prisma.facility.upsert({
    where: { societyId_name: { societyId: society.id, name: "Badminton Court" } },
    update: {},
    create: {
      name: "Badminton Court",
      description: "Outdoor badminton court. Bring your own rackets.",
      capacity: 4,
      rules: "Max 1 hour per booking. Open 6AM - 9PM.",
      isAvailable: true,
      societyId: society.id,
    },
  });
  console.log(`✅ Facilities created: Clubhouse, Badminton Court`);

  // ------------------------------------------------------------------
  // DONE
  // ------------------------------------------------------------------
  console.log("\n🎉 Seed complete! Here are your test accounts:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👤 ADMIN    → bhide@gcs.com       / password123");
  console.log("🏠 RESIDENT → jethalal@gcs.com    / password123");
  console.log("🏠 RESIDENT → taarak@gcs.com      / password123");
  console.log("⏳ PENDING  → hathi@gcs.com        / password123");
  console.log("🔧 STAFF    → popatlal@gcs.com    / password123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
