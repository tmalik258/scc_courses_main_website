import { Button } from "@/components/ui/button"
import Image from "next/image"

export function InstructorSection() {
  return (
    <section className="px-6 py-16 bg-[#F3FBFF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Hello World</h2>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-full overflow-hidden border-10 border-aqua-mist shadow-xl">
              <Image
                width={256}
                height={256}
                src="/images/landing_page/hardik_vij.jpg?height=256&width=256"
                alt="Hardik Vij"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">I&apos;m Hardik Vij</h3>
            <p className="text-gray-600 mb-4">Developer | Educator | Entrepreneur | Youtuber</p>

            <p className="text-gray-700 leading-relaxed mb-6">
              I&apos;m a determined passionate and hard working individual with underlying self motivation and experience in
              Mobile Application Development, Website Development and Game Development.
            </p>

            <Button className="bg-aqua-mist hover:bg-aqua-depth cursor-pointer font-manrope text-white px-8 py-3">View Portfolio</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
