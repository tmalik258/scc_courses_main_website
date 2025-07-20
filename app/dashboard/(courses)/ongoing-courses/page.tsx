import { CourseCard } from "../_components/course-card";

export default function OngoingCourses() {
  const ongoingCourses = [
    {
      id: 1,
      category: "Data Science",
      categoryBgColor: "bg-blue-600/25",
      categoryTextColor: "text-blue-600",
      title: "Machine Learning with Python: From Basics to Deployment",
      mentor: "Mentor's Name",
      currentLesson: 10,
      totalLessons: 30,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: false,
    },
    {
      id: 2,
      category: "WhatsApp Chatbots",
      categoryBgColor: "bg-purple-500/50",
      categoryTextColor: "bg-purple-500",
      title: "Build a WhatsApp Chatbot with Node.js & Twilio API",
      mentor: "Mentor's Name",
      currentLesson: 15,
      totalLessons: 50,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: false,
    },
    {
      id: 3,
      category: "AI Calling",
      categoryBgColor: "bg-green-500/50",
      categoryTextColor: "bg-green-500",
      title: "Create Smart Call Assistants using Voice AI",
      mentor: "Mentor's Name",
      currentLesson: 20,
      totalLessons: 40,
      progress: 50,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: false,
    },
  ];

  return (
    <div>
      {ongoingCourses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
}
