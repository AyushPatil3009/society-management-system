"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  flatId: z.string().min(1, "Please select your flat"),
  residentType: z.enum(["OWNER", "TENANT"], {
    error: "Select whether you are an Owner or Tenant",
  }),
});

export type RegisterState = {
  error?: string;
  success?: boolean;
};

export async function registerResidentAction(
  prevState: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    flatId: formData.get("flatId"),
    residentType: formData.get("residentType"),
  };

  // 1. Zod validation
  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    const firstErrorMessage = validation.error.issues[0]?.message;
    return { error: firstErrorMessage || "Invalid input details." };
  }

  const { name, email, password, phone, flatId, residentType } = validation.data;

  try {
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // 3. Find the flat & society
    const flat = await prisma.flat.findUnique({
      where: { id: flatId },
      include: { building: true },
    });

    if (!flat) {
      return { error: "Selected flat does not exist." };
    }

    // 4. Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Create Resident with PENDING_APPROVAL status
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        role: "RESIDENT",
        status: "PENDING_APPROVAL", // Awaits admin verification
        residentType,
        flatId: flat.id,
        societyId: flat.building.societyId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to submit registration. Please try again." };
  }
}