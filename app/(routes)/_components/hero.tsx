"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "nextjs-toploader/app";

// Icons
const PeopleIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 md:w-6 md:h-6"
  >
    {/* SVG path omitted for brevity */}
  </svg>
);

const CodeIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 md:w-6 md:h-6"
  >
    {/* SVG path omitted for brevity */}
  </svg>
);

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 md:w-5 md:h-5"
  >
    {/* SVG path omitted for brevity */}
  </svg>
);

// Button Component
const FindCoursesButton = () => {
  const router = useRouter();

  const navigationItems = [{ label: "Courses", path: "/courses" }];

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <button
      onClick={() => {
        const courseLink = navigationItems.find(
          (item) => item.label === "Courses"
        );
        if (courseLink) handleRedirect(courseLink.path);
      }}
      className="bg-aqua-mist hover:bg-aqua-depth text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-semibold transition-colors text-sm md:text-base"
    >
      Find Courses
    </button>
  );
};

const Hero = () => {
  const stats = [
    { number: "50+", label: "Students Educated", icon: <PeopleIcon /> },
    { number: "100+", label: "Apps Developed & Published", icon: <CodeIcon /> },
    { number: "50+", label: "Reviews on Google", icon: <StarIcon /> },
  ];

  return (
    <section className="px-4 md:px-6 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Content Section */}
        <div className="md:col-span-3 space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
              Unlock Your Tech Potential & Build the Future!
            </h1>
            <p className="text-base md:text-md text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Learn AI, Chatbots & App Development with Interactive, Hands-on
              Courses Designed for All Skill Levels.
            </p>
            <FindCoursesButton />
          </div>

          {/* Stats Section */}
          <div className="mt-8 md:mt-12 lg:mt-16">
            <div className="bg-sky-ice p-4 md:p-4 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-2">
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center lg:justify-equal relative">
                      <div className="flex flex-col gap-2 max-lg:flex-row flex-1 max-lg:justify-between max-lg:items-center">
                        <div className="flex items-center">
                          <span className="text-2xl xl:text-[40px] font-black text-aqua-mist">
                            {stat.number}
                          </span>
                        </div>
                        <div className="flex items-center max-lg:justify-end max-lg:text-right justify-center text-left gap-2 text-gray-600">
                          <span className="shrink-0">{stat.icon}</span>
                          <span className="text-sm lg:text-base font-manrope leading-tight flex-1">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                      {index < stats.length - 1 && (
                        <div className="absolute max-lg:left-0 max-lg:-bottom-2 max-lg:w-full lg:right-5">
                          <div className="h-px w-full lg:h-14 lg:w-px max-lg:bg-[#c8c8c836] bg-[#c8c8c8] mx-auto" />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:col-span-2 relative order-1 lg:order-2 flex justify-center lg:justify-end overflow-hidden">
          <div className="relative w-full">
            <div className="relative mx-auto">
              <svg
                className="w-full h-full"
                viewBox="0 0 481 456"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  cx="212.54"
                  cy="197.46"
                  r="195.92"
                  stroke="#5CB1D1"
                  strokeWidth="1.24"
                />
                <path
                  d="M480.49 192.1C484.037 247.321 469.015 302.142 437.814 347.84C406.612 393.539 361.024 427.49 308.302 444.291C255.58 461.093 198.754 459.78 146.864 440.561C94.9747 421.342 51.0031 385.322 21.9457 338.231L233 208L480.49 192.1Z"
                  fill="#5CB1D1"
                />
                <path
                  d="M0.287187 171.086C8.8871 125.437 30.1348 83.1215 61.6099 48.9587L88.1312 73.3935C61.2328 102.589 43.0748 138.752 35.7254 177.763L0.287187 171.086Z"
                  fill="#5CB1D1"
                />
              </svg>
              <div className="absolute w-full h-[calc(100%_+_4.5rem)] inset-0 flex items-center justify-center max-md:-left-3 -top-16">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/landing_page/hero.png?height=500&width=500"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    alt="Hero Image"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
