import Image from "next/image";
import React from "react";

const PeopleIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 md:w-6 md:h-6"
  >
    <path
      d="M15.7499 12.5C14.7862 12.5 13.8543 12.0697 13.1249 11.2888C12.4157 10.527 11.9826 9.51125 11.9062 8.42938C11.8246 7.27531 12.1767 6.21406 12.8971 5.44063C13.6176 4.66719 14.6249 4.25 15.7499 4.25C16.867 4.25 17.8771 4.67469 18.5953 5.44625C19.3204 6.22531 19.6734 7.28469 19.5918 8.42891C19.5135 9.51219 19.0809 10.5275 18.3731 11.2883C17.6456 12.0697 16.7142 12.5 15.7499 12.5ZM21.9295 20.75H9.57088C9.37219 20.7511 9.17589 20.7065 8.99711 20.6198C8.81833 20.5331 8.66182 20.4065 8.53963 20.2498C8.41003 20.08 8.32052 19.883 8.27782 19.6736C8.23513 19.4643 8.24034 19.248 8.29307 19.0409C8.68776 17.4561 9.66557 16.1417 11.1206 15.2403C12.412 14.4406 14.0559 14 15.7499 14C17.4773 14 19.0781 14.4219 20.377 15.2211C21.8353 16.1178 22.8145 17.4397 23.2073 19.0438C23.2594 19.251 23.264 19.4673 23.2208 19.6765C23.1777 19.8857 23.0878 20.0825 22.9579 20.2522C22.8359 20.4082 22.6797 20.5341 22.5014 20.6204C22.3232 20.7067 22.1275 20.751 21.9295 20.75ZM6.89057 12.6875C5.24104 12.6875 3.79073 11.1538 3.6562 9.26891C3.58963 8.30328 3.89057 7.41031 4.49995 6.75547C5.10276 6.10719 5.95307 5.75 6.89057 5.75C7.82807 5.75 8.67182 6.10906 9.27792 6.76109C9.89198 7.42109 10.192 8.31219 10.1217 9.26984C9.98713 11.1542 8.53729 12.6875 6.89057 12.6875ZM9.96838 14.1617C9.14385 13.7586 8.0737 13.557 6.89104 13.557C5.5101 13.557 4.16901 13.917 3.11432 14.5705C1.91854 15.3125 1.11417 16.393 0.789322 17.6975C0.741783 17.8851 0.737287 18.0811 0.776169 18.2707C0.815051 18.4603 0.896305 18.6387 1.01385 18.7925C1.12539 18.9357 1.26828 19.0514 1.43154 19.1307C1.5948 19.21 1.77407 19.2508 1.95557 19.25H7.1587C7.24652 19.25 7.33155 19.2192 7.39896 19.1629C7.46638 19.1066 7.51191 19.0284 7.5276 18.942C7.53276 18.9125 7.53932 18.883 7.54682 18.8539C7.94432 17.2573 8.87573 15.9083 10.252 14.9248C10.3026 14.8884 10.3433 14.8398 10.3704 14.7836C10.3975 14.7274 10.4102 14.6653 10.4073 14.603C10.4044 14.5407 10.3859 14.4801 10.3536 14.4267C10.3214 14.3733 10.2763 14.3288 10.2224 14.2972C10.1489 14.2541 10.0645 14.2086 9.96838 14.1617Z"
      fill="#5CB1D1"
    />
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
    <g clipPath="url(#clip0_2025_18705)">
      <path
        d="M14.6205 3.1619C14.8103 3.215 14.9878 3.30499 15.1428 3.42673C15.2978 3.54846 15.4273 3.69956 15.5239 3.87137C15.6204 4.04318 15.6822 4.23234 15.7057 4.42804C15.7291 4.62374 15.7137 4.82214 15.6605 5.0119L11.2295 20.7989C11.1221 21.182 10.8669 21.5067 10.52 21.7017C10.1732 21.8966 9.76307 21.9458 9.37997 21.8384C8.99686 21.731 8.67212 21.4758 8.47717 21.1289C8.28223 20.7821 8.23306 20.372 8.34047 19.9889L12.7715 4.1999C12.8247 4.01018 12.9148 3.8328 13.0365 3.6779C13.1583 3.523 13.3094 3.39361 13.4812 3.29713C13.653 3.20064 13.8421 3.13895 14.0378 3.11557C14.2334 3.0922 14.4318 3.1076 14.6215 3.1609L14.6205 3.1619ZM7.56047 7.1969C7.84137 7.47815 7.99915 7.85939 7.99915 8.2569C7.99915 8.6544 7.84137 9.03565 7.56047 9.3169L4.38047 12.4999L7.56247 15.6819C7.84373 15.9633 8.00169 16.3449 8.0016 16.7427C8.0015 17.1406 7.84336 17.5221 7.56197 17.8034C7.28057 18.0847 6.89897 18.2426 6.50112 18.2425C6.10326 18.2424 5.72173 18.0843 5.44047 17.8029L1.19747 13.5599C0.916568 13.2786 0.758789 12.8974 0.758789 12.4999C0.758789 12.1024 0.916568 11.7211 1.19747 11.4399L5.43947 7.1969C5.57877 7.05751 5.74417 6.94693 5.92622 6.87149C6.10827 6.79605 6.30341 6.75722 6.50047 6.75722C6.69753 6.75722 6.89267 6.79605 7.07472 6.87149C7.25677 6.94693 7.42117 7.05751 7.56047 7.1969ZM16.4405 9.3169C16.2931 9.17957 16.1749 9.01397 16.0929 8.82997C16.0109 8.64597 15.9668 8.44735 15.9633 8.24594C15.9597 8.04454 15.9968 7.84448 16.0722 7.6577C16.1477 7.47092 16.26 7.30126 16.4024 7.15882C16.5448 7.01638 16.7145 6.90409 16.9013 6.82865C17.0881 6.75321 17.2881 6.71616 17.4895 6.71971C17.6909 6.72327 17.8895 6.76735 18.0735 6.84933C18.2575 6.93132 18.4231 7.04952 18.5605 7.1969L22.8035 11.4389C23.0847 11.7202 23.2426 12.1017 23.2426 12.4994C23.2426 12.8971 23.0847 13.2786 22.8035 13.5599L18.5615 17.8029C18.4222 17.9422 18.2569 18.0528 18.0749 18.1282C17.8929 18.2036 17.6978 18.2425 17.5008 18.2425C17.3038 18.2426 17.1087 18.2038 16.9267 18.1285C16.7447 18.0531 16.5793 17.9427 16.44 17.8034C16.3006 17.6641 16.1901 17.4988 16.1147 17.3168C16.0392 17.1348 16.0004 16.9397 16.0003 16.7427C16.0003 16.5457 16.0391 16.3507 16.1144 16.1686C16.1897 15.9866 16.3002 15.8212 16.4395 15.6819L19.6215 12.4999L16.4405 9.3169Z"
        fill="#5CB1D1"
      />
    </g>
    <defs>
      <clipPath id="clip0_2025_18705">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
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
    <path
      d="M9.5 15.5745L14.1074 18.3368C14.9511 18.843 15.9836 18.0947 15.7616 17.1482L14.5403 11.9537L18.6148 8.45405C19.3586 7.81575 18.959 6.60517 17.982 6.52813L12.6197 6.07692L10.5214 1.16857C10.1439 0.277143 8.85608 0.277143 8.47861 1.16857L6.38032 6.06591L1.01801 6.51713C0.0410305 6.59416 -0.358644 7.80474 0.385195 8.44305L4.45966 11.9427L3.23843 17.1372C3.01639 18.0837 4.04888 18.832 4.89264 18.3258L9.5 15.5745Z"
      fill="#5CB1D1"
    />
  </svg>
);

const Hero = () => {
  const stats = [
    { number: "50+", label: "Students Educated", icon: <PeopleIcon /> },
    { number: "100+", label: "Apps Developed & Published", icon: <CodeIcon /> },
    { number: "50+", label: "Reviews on Google", icon: <StarIcon /> },
  ];

  return (
    <section className="relative right-6  px-4 md:px-6 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
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
            <button className="bg-aqua-mist hover:bg-aqua-depth text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-semibold transition-colors text-sm md:text-base">
              Find Courses
            </button>
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
                      {/* Divider - only show on larger screens and not after last item */}
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
            {/* Background SVG - responsive sizing */}
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

              {/* Hero Image - positioned absolutely over SVG */}
              <div className="absolute w-full h-[calc(100%_+_4.5rem)] inset-0 flex items-center justify-center max-md:-left-3 -top-16">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/landing_page/hero.png?height=500&width=500"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    alt="Hero Image - Woman with books showing tech education"
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
