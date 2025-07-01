import Link from "next/link";
import {
  MessageCircle,
  Code,
  Globe,
  BarChart3,
  Settings,
  Bot,
} from "lucide-react";

const Categories = () => {
  const courseCategories = [
    {
      title: "AI Calling",
      courses: "50+ course available",
      price: "Start from ₹1,350",
      icon: Bot,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "WhatsApp Chatbots",
      courses: "20+ course available",
      price: "Start from ₹1,000",
      icon: MessageCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Make Automations",
      courses: "20+ course available",
      price: "Start from ₹1,200",
      icon: Settings,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "App Development",
      courses: "100+ course available",
      price: "Start from ₹800",
      icon: Code,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Web Development",
      courses: "50+ course available",
      price: "Start from ₹1,350",
      icon: Globe,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Data Science",
      courses: "100+ course available",
      price: "Start from ₹1,150",
      icon: BarChart3,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Find the Right Course Category for You
            </h2>
            <p className="text-gray-600">
              Explore our course categories and start mastering the tech skills
              today!
            </p>
          </div>
          <Link
            href="/courses"
            className="text-cyan-500 hover:text-cyan-600 font-semibold flex items-center space-x-1"
          >
            <span>View More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex space-x-4 h-full">
                <div
                  className={`w-20 h-full ${category.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {category.courses}
                  </p>
                  <p className="text-cyan-500 font-semibold">
                    {category.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
