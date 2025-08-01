/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../generated/prisma/client");

const prisma = new PrismaClient();

async function seedLessons() {
  try {
    console.log("Starting lessons seeding...");

    // Sample lesson data
    const lessonsData = [
      {
        moduleId: "550e8400-e29b-41d4-a716-446655440001", // Replace with actual module UUID
        title: "Introduction to JavaScript Basics",
        content:
          "Learn the fundamentals of JavaScript programming, including variables, data types, and functions.",
        videoUrl: "https://example.com/videos/js-basics.mp4",
        isFree: true,
      },
      {
        moduleId: "550e8400-e29b-41d4-a716-446655440001",
        title: "Working with Arrays and Objects",
        content:
          "Explore JavaScript arrays and objects, including common methods and manipulation techniques.",
        videoUrl: "https://example.com/videos/js-arrays-objects.mp4",
        isFree: false,
      },
      {
        moduleId: "550e8400-e29b-41d4-a716-446655440002", // Replace with actual module UUID
        title: "Introduction to React Components",
        content:
          "Understand the basics of React components, props, and state management.",
        videoUrl: "https://example.com/videos/react-components.mp4",
        isFree: true,
      },
      {
        moduleId: "550e8400-e29b-41d4-a716-446655440002",
        title: "React Hooks Overview",
        content:
          "Dive into React Hooks, including useState, useEffect, and custom hooks.",
        videoUrl: "https://example.com/videos/react-hooks.mp4",
        isFree: false,
      },
      {
        moduleId: "550e8400-e29b-41d4-a716-446655440003", // Replace with actual module UUID
        title: "Python Fundamentals",
        content:
          "Learn Python basics including syntax, variables, and control structures.",
        videoUrl: "https://example.com/videos/python-fundamentals.mp4",
        isFree: true,
      },
    ];

    // Create lessons
    for (const lesson of lessonsData) {
      const createdLesson = await prisma.lessons.create({
        data: {
          title: lesson.title,
          content: lesson.content,
          video_url: lesson.videoUrl,
          is_free: lesson.isFree,
          module_id: lesson.moduleId,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      console.log(`Created lesson: ${createdLesson.title}`);
    }

    console.log("Lessons seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedLessons();
