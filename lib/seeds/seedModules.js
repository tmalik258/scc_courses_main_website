/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../generated/prisma/client");
require("@supabase/supabase-js");
const prisma = new PrismaClient();

// Initialize Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Supabase URL or Service Role Key is missing in environment variables"
  );
}

async function seedModules() {
  try {
    console.log("Starting modules seeding...");

    // Sample module data (requires existing course IDs)
    const modulesData = [
      {
        courseId: "550e8400-e29b-41d4-a716-446655440000", // Replace with actual course UUID
        title: "JavaScript Fundamentals",
      },
      {
        courseId: "550e8400-e29b-41d4-a716-446655440000",
        title: "Advanced JavaScript",
      },
      {
        courseId: "550e8400-e29b-41d4-a716-446655440001", // Replace with actual course UUID
        title: "React Basics",
      },
    ];

    // Create modules
    // eslint-disable-next-line @next/next/no-assign-module-variable
    for (const module of modulesData) {
      const createdModule = await prisma.module.create({
        data: {
          courseId: module.courseId,
          title: module.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(
        `Created module: ${createdModule.title} (ID: ${createdModule.id})`
      );
    }

    console.log("Modules seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding modules:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedModules();
