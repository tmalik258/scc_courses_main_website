import Image from "next/image";

interface CourseImageProps {
  imageUrl: string;
  alt?: string;
}

export function CourseImage({
  imageUrl,
  alt = "Course image",
}: CourseImageProps) {
  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt={alt}
        width={280}
        height={200}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
  );
}
