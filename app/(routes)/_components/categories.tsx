import Link from "next/link";
import Image from "next/image";

const WhatsappIcon = () => (
  <svg
    width="60"
    height="61"
    viewBox="0 0 80 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M63.4997 16.8667C60.4432 13.7804 56.8031 11.3332 52.7914 9.66789C48.7797 8.00255 44.4766 7.15229 40.133 7.16668C21.933 7.16668 7.09968 22 7.09968 40.2C7.09968 46.0334 8.63301 51.7 11.4997 56.7L6.83301 73.8334L24.333 69.2334C29.1663 71.8667 34.5997 73.2667 40.133 73.2667C58.333 73.2667 73.1664 58.4334 73.1664 40.2334C73.1664 31.4 69.733 23.1 63.4997 16.8667ZM40.133 67.6667C35.1997 67.6667 30.3663 66.3334 26.133 63.8334L25.133 63.2333L14.733 65.9667L17.4997 55.8334L16.833 54.8C14.0915 50.4235 12.6361 45.3643 12.633 40.2C12.633 25.0667 24.9663 12.7334 40.0997 12.7334C47.433 12.7334 54.333 15.6 59.4997 20.8C62.0584 23.3462 64.0861 26.3752 65.4651 29.7111C66.8441 33.0471 67.547 36.6236 67.533 40.2334C67.5997 55.3667 55.2663 67.6667 40.133 67.6667ZM55.1997 47.1334C54.3663 46.7334 50.2997 44.7334 49.5663 44.4334C48.7997 44.1667 48.2663 44.0334 47.6997 44.8334C47.133 45.6667 45.5663 47.5334 45.0997 48.0667C44.633 48.6334 44.133 48.7 43.2997 48.2667C42.4663 47.8667 39.7997 46.9667 36.6663 44.1667C34.1997 41.9667 32.5663 39.2667 32.0663 38.4334C31.5997 37.6 31.9997 37.1667 32.433 36.7334C32.7997 36.3667 33.2663 35.7667 33.6663 35.3C34.0663 34.8334 34.233 34.4667 34.4997 33.9334C34.7663 33.3667 34.633 32.9 34.433 32.5C34.233 32.1 32.5663 28.0334 31.8997 26.3667C31.233 24.7667 30.533 24.9667 30.033 24.9334H28.433C27.8663 24.9334 26.9997 25.1334 26.233 25.9667C25.4997 26.8 23.3663 28.8 23.3663 32.8667C23.3663 36.9334 26.333 40.8667 26.733 41.4C27.133 41.9667 32.5663 50.3 40.833 53.8667C42.7997 54.7334 44.333 55.2334 45.533 55.6C47.4997 56.2334 49.2997 56.1334 50.733 55.9333C52.333 55.7 55.633 53.9334 56.2997 52C56.9997 50.0667 56.9997 48.4334 56.7663 48.0667C56.533 47.7 56.033 47.5334 55.1997 47.1334Z"
      fill="#2CA00F"
    />
  </svg>
);

const Categories = () => {
  const courseCategories = [
    {
      title: "AI Calling",
      courses: "50+ course available",
      price: "Start from ₹1,350",
      image: "/images/icons/ai_calling.png",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "WhatsApp Chatbots",
      courses: "20+ course available",
      price: "Start from ₹1,000",
      icon: <WhatsappIcon />,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Make Automations",
      courses: "20+ course available",
      price: "Start from ₹1,200",
      image: "/images/icons/make_automations.png",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "App Development",
      courses: "100+ course available",
      price: "Start from ₹800",
      image: "/images/icons/app_development.png",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Web Development",
      courses: "50+ course available",
      price: "Start from ₹1,350",
      image: "/images/icons/web_development.png",
      bgColor: "bg-cyan-100",
      iconColor: "text-aqua-depth",
    },
    {
      title: "Data Science",
      courses: "100+ course available",
      price: "Start from ₹1,150",
      image: "/images/icons/data_science.png",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="px-6 py-6 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3 mb-12 max-md:mb-2">
          <div>
            <h2 className="text-3xl md:text-xl font-bold text-gray-900 mb-2">
              Find the Right Course Category for You
            </h2>
            <p className="text-gray-600">
              Explore our course categories and start mastering the tech skills
              today!
            </p>
          </div>
          <Link
            href="/courses"
            className="text-aqua-mist hover:text-aqua-depth font-semibold flex items-center space-x-1 font-manrope max-md:self-end"
          >
            <span>View More</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4697 8.53015C13.396 8.46149 13.3369 8.37869 13.2959 8.28669C13.2549 8.19469 13.2329 8.09538 13.2311 7.99468C13.2293 7.89397 13.2478 7.79394 13.2856 7.70056C13.3233 7.60717 13.3794 7.52233 13.4506 7.45112C13.5219 7.3799 13.6067 7.32375 13.7001 7.28603C13.7935 7.24831 13.8935 7.22979 13.9942 7.23156C14.0949 7.23334 14.1942 7.25538 14.2862 7.29637C14.3782 7.33736 14.461 7.39647 14.5297 7.47015L18.5297 11.4702C18.6701 11.6108 18.749 11.8014 18.749 12.0002C18.749 12.1989 18.6701 12.3895 18.5297 12.5302L14.5297 16.5302C14.461 16.6038 14.3782 16.6629 14.2862 16.7039C14.1942 16.7449 14.0949 16.767 13.9942 16.7687C13.8935 16.7705 13.7935 16.752 13.7001 16.7143C13.6067 16.6766 13.5219 16.6204 13.4506 16.5492C13.3794 16.478 13.3233 16.3931 13.2856 16.2998C13.2478 16.2064 13.2293 16.1063 13.2311 16.0056C13.2329 15.9049 13.2549 15.8056 13.2959 15.7136C13.3369 15.6216 13.396 15.5388 13.4697 15.4702L16.1897 12.7502H6.49968C6.30077 12.7502 6.11 12.6711 5.96935 12.5305C5.8287 12.3898 5.74968 12.1991 5.74968 12.0002C5.74968 11.8012 5.8287 11.6105 5.96935 11.4698C6.11 11.3292 6.30077 11.2502 6.49968 11.2502H16.1897L13.4697 8.53015Z"
                fill="#5CB1D1"
              />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex space-x-4 h-full">
                <div
                  className={`w-20 md:w-24 h-full ${category.bgColor} rounded-lg flex items-center justify-center`}
                >
                  {category.image ? (
                    <span>
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover p-4"
                      />
                    </span>
                  ) : (
                    category.icon && <span>{category.icon}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-5 font-manrope">
                    {category.courses}
                  </p>
                  <p className="text-sm md:text-base text-aqua-mist font-semibold">
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
