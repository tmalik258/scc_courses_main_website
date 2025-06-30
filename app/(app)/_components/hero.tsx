import { Smartphone, Star, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const stats = [
    { number: "50+", label: "Students Educated", icon: Users },
    { number: "100+", label: "Apps Developed & Published", icon: Smartphone },
    { number: "50+", label: "Reviews on Google", icon: Star },
  ];

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Unlock Your Tech Potential & Build the Future!
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Learn AI, Chatbots & App Development with Interactive, Hands-on
              Courses Designed for All Skill Levels.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Find Courses
            </button>
          </div>
          {/* Stats Section */}
          <div className="flex justify-around mt-16 bg-[#EBF9FF] rounded-2xl p-5">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold text-cyan-500">
                      {stat.number}
                    </span>
                  </div>
                  <p className="text-gray-600 flex gap-2">
                    <stat.icon className="w-6 h-6 shrink-0 text-cyan-500" />{" "}
                    <span className="text-nowrap">{stat.label}</span>
                  </p>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block h-14 w-px bg-cyan-200 mx-auto my-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative">
          <svg
            width="481"
            height="386"
            viewBox="0 0 481 456"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          <div className="h-[480px] w-[425px] overflow-hidden absolute rounded-full -top-24 left-5">
            <Image
              src="/images/landing_page/hero.png"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
