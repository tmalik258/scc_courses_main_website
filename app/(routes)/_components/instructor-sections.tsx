import { Button } from "@/components/ui/button";
import Image from "next/image";

export function InstructorSection() {
  return (
    <section className="px-6 py-16 bg-[#F3FBFF]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Hello World</h2>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 relative rounded-full overflow-hidden border-[8px] border-[#5CB1D1] shadow-xl">
              <Image
                src="/images/landing_page/hardik_vij.jpg"
                alt="Hardik Vij"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              I&apos;m Hardik Vij
            </h3>
            <p className="text-gray-600 mb-4">
              Developer | Educator | Entrepreneur | Youtuber
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              I&apos;m a determined passionate and hard working individual with
              underlying self motivation and experience in Mobile Application
              Development, Website Development and Game Development.
            </p>

            <Button className="bg-[#5CB1D1] hover:bg-[#4CA0BF] text-white px-11 py-6 border-[2.5px] border-[#5CB1D1] transition-colors">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
