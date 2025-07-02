import { Check } from "lucide-react"

export function CourseBenefits() {
  const benefits = [
    "Lifetime access to the course",
    "Expert-led lessons",
    "Downloadable materials & templates",
    "Certificate of completion",
    "Real-world project tasks",
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
