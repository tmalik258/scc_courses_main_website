import { CertificateCard } from "./_components/certificate-card"

export default function CertificatesPage() {
  const certificates = [
    {
      category: "Make Automations",
      categoryColor: "bg-orange-500",
      title: "Zapier 101: Automate Tasks Without Code",
      completedDate: "23 Feb 2025",
      certificateImage: "/images/course_placeholder.jpg?height=200&width=300",
    },
    {
      category: "Web Development",
      categoryColor: "bg-cyan-500",
      title: "Responsive Web Design with HTML, CSS & Flexbox",
      completedDate: "5 Feb 2025",
      certificateImage: "/images/course_placeholder.jpg?height=200&width=300",
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
      title: "AI Voice Bots with Google Dialogflow & Twilio",
      completedDate: "11 Jan 2025",
      certificateImage: "/images/course_placeholder.jpg?height=200&width=300",
    },
    {
      category: "App Development",
      categoryColor: "bg-pink-500",
      title: "Flutter for Beginners: Build iOS & Android Apps",
      completedDate: "20 Dec 2024",
      certificateImage: "/images/course_placeholder.jpg?height=200&width=300",
    },
  ]

  return (
    <div>
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} {...certificate} />
        ))}
      </div>

      {/* Empty State (if no certificates) */}
      {certificates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Certificates Yet</h3>
          <p className="text-gray-600">Complete courses to earn certificates and showcase your achievements!</p>
        </div>
      )}
    </div>
  )
}
