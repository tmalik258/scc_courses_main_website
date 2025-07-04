import { CourseCard } from "../_components/course-card";

export default function CompletedCourses() {
  const completedCourses = [
    {
      category: "Make Automations",
      categoryColor: "bg-orange-500",
      title: "Zapier 101: Automate Tasks Without Code",
      mentor: "Mentor's Name",
      currentLesson: 35,
      totalLessons: 35,
      progress: 100,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: true,
      completedDate: "23 Feb 2025",
    },
    {
      category: "Web Development",
      categoryColor: "bg-cyan-500",
      title: "Responsive Web Design with HTML, CSS & Flexbox",
      mentor: "Mentor's Name",
      currentLesson: 30,
      totalLessons: 30,
      progress: 100,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: true,
      completedDate: "5 Feb 2025",
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
      title: "AI Voice Bots with Google Dialogflow & Twilio",
      mentor: "Mentor's Name",
      currentLesson: 16,
      totalLessons: 16,
      progress: 100,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      isCompleted: true,
      completedDate: "11 Jan 2025",
    },
  ];

  return (
    <div>
      {completedCourses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
}
