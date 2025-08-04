import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ConsultancySection() {
  return (
    <section className="relative px-6 py-8 max-md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 md:mb-12">
          Our Consultancy Firm
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-12">
          {/* Company Info */}
          <div className="flex items-center gap-6 md:mb-6">
            {/* Logo */}
            <div className="w-40 md:w-56 h-auto flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/landing_page/hv_technologies_logo.png"
                alt="consultancy firm logo"
                width={96}
                height={96}
                className="filter invert brightness-65 w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 grow w-full flex flex-col items-start">
            <p className="text-gray-600 leading-relaxed mb-8">
              Learning is pivotal for a student&apos;s success in academics and
              life. The Digital Age is deeply shaping the way students learn and
              will also determine their future prospects, we encourage students
              to embrace this fast.
            </p>
            {/* Visit Website Button */}
            <Button className="bg-aqua-mist hover:bg-aqua-depth text-white px-8 py-3 font-manrope max-md:self-end">
              Visit Website
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
