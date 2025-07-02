import Image from "next/image"

export function CourseImage() {
  return (
    <div className="relative">
      <Image
        src="/images/course_placeholder_2.jpg?height=200&width=280"
        alt="Machine Learning with Python course"
        width={280}
        height={200}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
  )
}
