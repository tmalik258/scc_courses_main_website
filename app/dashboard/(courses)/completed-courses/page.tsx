import { CourseCard } from "../_components/course-card";

export default function CompletedCourses() {
  const completedCourses = [
    {
      id: 1,
      category: "Make Automations",
      categoryBgColor: "bg-orange-500/25",
      categoryTextColor: "text-orange-500",
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
      id: 2,
      category: "Web Development",
      categoryBgColor: "bg-aqua-mist/25",
      categoryTextColor: "text-aqua-mist",
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
      id: 3,
      category: "AI Calling",
      categoryBgColor: "bg-purple-500/25",
      categoryTextColor: "text-purple-500",
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
