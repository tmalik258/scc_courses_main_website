import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ConsultancySection() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Our Consultancy Firm
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Company Info */}
          <div className="flex items-center gap-6 mb-6">
            {/* Logo */}
            <div className="w-40 h-40 rounded-full flex items-center justify-center flex-shrink-0 grayscale bg-gray-500">
              <Image src="/images/landing_page/hv_technologies_logo.png" alt="consultancy firm logo" width={96} height={96} className="grayscale w-full h-full object-contain px-3" />
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 grow w-full">
            <p className="text-gray-600 leading-relaxed mb-8">
              Learning is pivotal for a student&apos;s success in academics and
              life. The Digital Age is deeply shaping the way students learn and
              will also determine their future prospects, we encourage students to
              embrace this fast.
            </p>
            {/* Visit Website Button */}
            <Button className="bg-sky-400 hover:bg-sky-500 text-white px-8 py-3">
              Visit Website
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
