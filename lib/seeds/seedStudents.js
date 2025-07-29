/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../generated/prisma");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function seedStudents() {
  try {
    // Generate a Supabase-compatible user ID
    const testUserId = uuidv4();
    // Find or create the test profile
    let student = await prisma.profile.findUnique({
      where: { email: "uiopqer23@gmail.com" },
    });

    if (!student) {
      student = await prisma.profile.create({
        data: {
          id: uuidv4(),
          userId: testUserId,
          email: "uiopqer23@gmail.com",
          fullName: "Test User",
          role: "STUDENT",
          isActive: true,
        },
      });
      console.log(
        `Created profile for uiopqer23@gmail.com with ID: ${student.id}, userId: ${testUserId}`
      );
    }

    // Find or create the Web Development category
    let category = await prisma.category.findFirst({
      where: { name: "Web Development" },
    });
    if (!category) {
      category = await prisma.category.create({
        data: {
          id: uuidv4(),
          name: "Web Development",
          slug: "web-development",
          description: "Courses related to web development",
          icon: "code",
          color: "#2563EB",
          isActive: true,
        },
      });
      console.log(`Created category: Web Development with ID: ${category.id}`);
    }

    // Define courses with unique IDs
    const courses = [
      {
        id: uuidv4(),
        title: "Introduction to JavaScript",
        description: "Learn the fundamentals of JavaScript programming",
        thumbnailUrl: "https://example.com/thumbnails/js.jpg",
        price: 49.99,
        isPublished: true,
      },
      {
        id: uuidv4(),
        title: "React for Beginners",
        description: "Build modern web applications with React",
        thumbnailUrl: "https://example.com/thumbnails/react.jpg",
        price: 59.99,
        isPublished: true,
      },
      {
        id: uuidv4(),
        title: "Node.js Essentials",
        description: "Master backend development with Node.js",
        thumbnailUrl: "https://example.com/thumbnails/nodejs.jpg",
        price: 54.99,
        isPublished: true,
      },
    ];

    // Seed courses and related data
    for (const courseData of courses) {
      const course = await prisma.course.upsert({
        where: { id: courseData.id },
        update: {},
        create: {
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          instructorId: student.id,
          categoryId: category.id,
          thumbnailUrl: courseData.thumbnailUrl,
          price: courseData.price,
          isPublished: courseData.isPublished,
        },
      });
      console.log(
        `Course "${course.title}" seeded successfully with ID: ${course.id}`
      );

      // Delete existing modules to avoid duplicates
      await prisma.module.deleteMany({
        where: { courseId: course.id },
      });

      // Create module
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await prisma.module.create({
        data: {
          id: uuidv4(),
          title: `${course.title} Module 1`,
          courseId: course.id,
        },
      });

      // Create lessons
      const lessons = [
        {
          id: uuidv4(),
          title: `${course.title} Lesson 1`,
          content: "Introduction",
          is_free: false,
        },
        {
          id: uuidv4(),
          title: `${course.title} Lesson 2`,
          content: "Basics",
          is_free: false,
        },
      ];

      for (const lessonData of lessons) {
        await prisma.lesson.create({
          data: {
            id: lessonData.id,
            title: lessonData.title,
            content: lessonData.content,
            module_id: module.id,
            is_free: lessonData.is_free,
            video_url: "https://example.com/videos/lesson.mp4",
          },
        });
      }

      // Seed purchase
      await prisma.purchase.upsert({
        where: {
          studentId_courseId: { studentId: student.id, courseId: course.id },
        },
        update: {},
        create: {
          studentId: student.id,
          courseId: course.id,
        },
      });

      // Seed progress (one lesson completed)
      const firstLesson = await prisma.lesson.findFirst({
        where: { module_id: module.id },
      });
      if (firstLesson) {
        await prisma.progress.upsert({
          where: {
            studentId_lesson_id: {
              studentId: student.id,
              lesson_id: firstLesson.id,
            },
          },
          update: {},
          create: {
            studentId: student.id,
            lesson_id: firstLesson.id,
            isCompleted: true,
            completedAt: new Date(),
            watchTime: 0,
          },
        });
      }

      console.log(
        `Seeded module, lessons, purchase, and progress for "${course.title}"`
      );
    }

    // Verify seeded courses
    const seededCourses = await prisma.course.findMany({
      where: {
        OR: [
          { instructorId: student.id },
          { purchases: { some: { studentId: student.id } } },
        ],
      },
      include: {
        category: { select: { name: true } },
        instructor: { select: { fullName: true } },
        modules: { include: { lessons: true } },
        purchases: { where: { studentId: student.id } },
        progress: { where: { studentId: student.id } },
      },
    });

    console.log("Seeded courses:", JSON.stringify(seededCourses, null, 2));
  } catch (error) {
    console.error("Error seeding courses:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedStudents();
