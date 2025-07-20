interface CourseCardProps {
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: string;
}

export function CourseCard({
  category,
  categoryColor,
  categoryBg,
  title,
  mentor,
  students,
  rating,
  originalPrice,
  discountedPrice,
  discount,
  image,
}: CourseCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-cover rounded-xl mb-5"
      />

      {/* Category label */}
      <span
        className="text-xs font-medium px-3 py-1 inline-block rounded-md mb-3"
        style={{
          backgroundColor: categoryBg,
          color: categoryColor,
        }}
      >
        {category}
      </span>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">By {mentor}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{students}</span>
        <span className="text-yellow-600 font-medium">{rating}</span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
          </div>
          <span className="text-lg font-semibold" style={{ color: "#5CB1D1" }}>
            ₹{discountedPrice}
          </span>
        </div>

        <span className="text-sm font-normal bg-[#FFECEC] text-[#C12020] px-3 py-1 rounded-md">
          {discount}
        </span>
      </div>
    </div>
  );
}
