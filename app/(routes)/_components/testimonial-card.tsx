import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialType {
  id: number;
  name: string;
  title: string;
  rating: number;
  review: string;
  avatar: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <div className="bg-white rounded-md p-6 h-full border border-gray-200">
      {/* Stars */}
      <div className="flex items-center gap-2 mb-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
        <svg
          width="49"
          height="48"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-auto"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 12C11.4391 12 10.4217 12.4214 9.67157 13.1716C8.92143 13.9217 8.5 14.9391 8.5 16V22C8.5 23.0609 8.92143 24.0783 9.67157 24.8284C10.4217 25.5786 11.4391 26 12.5 26H18.5C18.5 27.5913 17.8679 29.1174 16.7426 30.2426C15.6174 31.3679 14.0913 32 12.5 32H10.5C9.96957 32 9.46086 32.2107 9.08579 32.5858C8.71071 32.9609 8.5 33.4696 8.5 34C8.5 34.5304 8.71071 35.0391 9.08579 35.4142C9.46086 35.7893 9.96957 36 10.5 36H12.5C15.1522 36 17.6957 34.9464 19.5711 33.0711C21.4464 31.1957 22.5 28.6522 22.5 26V16C22.5 14.9391 22.0786 13.9217 21.3284 13.1716C20.5783 12.4214 19.5609 12 18.5 12H12.5ZM30.5 12C29.4391 12 28.4217 12.4214 27.6716 13.1716C26.9214 13.9217 26.5 14.9391 26.5 16V22C26.5 23.0609 26.9214 24.0783 27.6716 24.8284C28.4217 25.5786 29.4391 26 30.5 26H36.5C36.5 27.5913 35.8679 29.1174 34.7426 30.2426C33.6174 31.3679 32.0913 32 30.5 32H28.5C27.9696 32 27.4609 32.2107 27.0858 32.5858C26.7107 32.9609 26.5 33.4696 26.5 34C26.5 34.5304 26.7107 35.0391 27.0858 35.4142C27.4609 35.7893 27.9696 36 28.5 36H30.5C33.1522 36 35.6957 34.9464 37.5711 33.0711C39.4464 31.1957 40.5 28.6522 40.5 26V16C40.5 14.9391 40.0786 13.9217 39.3284 13.1716C38.5783 12.4214 37.5609 12 36.5 12H30.5Z"
            fill="#5CB1D1"
          />
        </svg>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.review}</p>

      {/* User Info */}
      <div className="flex items-center">
        <Image
          width={60}
          height={60}
          src={
            testimonial.avatar ||
            "/images/landing_page/testimonial_placeholder.jpg"
          }
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm font-manrope">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
