import { Play } from "lucide-react"
import Image from "next/image"

export function LessonVideo() {
  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-6">
      <Image
        src="/images/instructor_placeholder.jpg?height=300&width=600"
        alt="Course instructor"
        width={600}
        height={300}
        className="w-full h-[500px] object-cover object-top brightness-45"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="relative bg-transparent hover:bg-opacity-100 rounded-full p-3 py-4 transition-all duration-200">
          <div className="absolute inset-0 bg-gray-300/35 rounded-full"></div>
          <div className="absolute inset-0 bg-gray-300/30 blur-lg rounded-full"></div>
          <Play className="w-8 h-8 text-white fill-white ml-1 fill" />
        </button>
      </div>
    </div>
  )
}
