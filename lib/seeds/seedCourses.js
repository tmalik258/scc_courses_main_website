// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

async function seedCourses() {
  try {
    // Fetch category IDs based on slugs from seedCategories.ts
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          in: [
            "web-development",
            "mobile-development",
            "data-science",
            "artificial-intelligence",
            "cloud-computing",
          ],
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    // Create a map of slug to categoryId
    const categoryMap = categories.reduce((map, category) => {
      map[category.slug] = category.id;
      return map;
    }, {});

    // Override web-development categoryId with provided ID
    categoryMap["web-development"] = "14fc406a-9654-4354-b240-21542d994f6f";

    // Check if all required categories exist
    const requiredSlugs = [
      "web-development",
      "mobile-development",
      "data-science",
      "artificial-intelligence",
      "cloud-computing",
    ];
    const missingSlugs = requiredSlugs.filter((slug) => !categoryMap[slug]);
    if (missingSlugs.length > 0) {
      throw new Error(
        `Missing categories with slugs: ${missingSlugs.join(
          ", "
        )}. Please run seedCategories.ts first.`
      );
    }

    await prisma.course.createMany({
      data: [
        {
          title: "React Fundamentals",
          description: "Master the basics of React development",
          categoryId: categoryMap["web-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 49.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/react-fundamentals.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Advanced Node.js",
          description: "Deep dive into Node.js backend development",
          categoryId: categoryMap["web-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 79.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/advanced-nodejs.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "iOS Development with Swift",
          description: "Build modern iOS applications",
          categoryId: categoryMap["mobile-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 69.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/ios-swift.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Android Development with Kotlin",
          description: "Create Android apps with Kotlin",
          categoryId: categoryMap["mobile-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 59.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/android-kotlin.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Python for Data Science",
          description: "Learn Python for data analysis",
          categoryId: categoryMap["data-science"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 89.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/python-data-science.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Machine Learning Basics",
          description: "Introduction to ML concepts",
          categoryId: categoryMap["artificial-intelligence"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 64.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/ml-basics.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Deep Learning with TensorFlow",
          description: "Advanced neural networks with TensorFlow",
          categoryId: categoryMap["artificial-intelligence"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 99.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/deep-learning.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "AWS Cloud Practitioner",
          description: "Get started with AWS cloud services",
          categoryId: categoryMap["cloud-computing"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 54.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/aws-practitioner.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Azure Fundamentals",
          description: "Master Microsoft Azure basics",
          categoryId: categoryMap["cloud-computing"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 59.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/azure-fundamentals.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "TypeScript for Web Developers",
          description: "Enhance web dev with TypeScript",
          categoryId: categoryMap["web-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 44.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/typescript-web.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Data Visualization with R",
          description: "Create stunning visualizations with R",
          categoryId: categoryMap["data-science"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 74.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/data-viz-r.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Flutter Cross-Platform Development",
          description: "Build apps for multiple platforms",
          categoryId: categoryMap["mobile-development"],
          instructorId: "f6c2637f-78f2-42eb-9c41-0c42acabf667",
          price: 64.99,
          isPublished: true,
          thumbnailUrl: "https://example.com/images/flutter.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      skipDuplicates: true,
    });

    console.log("Courses seeded successfully!");
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses();
