import { CourseCard } from "../_components/course-card";

export default function OngoingCourses() {
  const ongoingCourses = [
    {
      category: "Data Science",
      categoryColor: "bg-blue-600",
      title: "Machine Learning with Python: From Basics to Deployment",
      mentor: "Mentor's Name",
      currentLesson: 10,
      totalLessons: 30,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: false,
    },
    {
      category: "WhatsApp Chatbots",
      categoryColor: "bg-purple-500",
      title: "Build a WhatsApp Chatbot with Node.js & Twilio API",
      mentor: "Mentor's Name",
      currentLesson: 15,
      totalLessons: 50,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: false,
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
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
