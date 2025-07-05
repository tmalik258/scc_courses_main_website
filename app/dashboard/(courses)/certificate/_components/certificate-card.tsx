import { Button } from "@/components/ui/button"
import { Download, CheckCircle } from 'lucide-react'
import Image from "next/image"

interface CertificateCardProps {
  category: string
  categoryColor: string
  title: string
  completedDate: string
  certificateImage: string
}

export function CertificateCard({ category, categoryColor, title, completedDate, certificateImage }: CertificateCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Certificate Image */}
      <div className="relative">
        <Image
          src={certificateImage || "/placeholder.svg"}
          alt={`${title} Certificate`}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`${categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{category}</span>
        </div>

        {/* Course Title */}
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h3>

        {/* Completion Status */}
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Completed on {completedDate}</span>
        </div>

        {/* Download Button */}
        <Button className="w-full bg-aqua-mist hover:bg-aqua-depth text-white flex items-center justify-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download Certificate</span>
        </Button>
      </div>
    </div>
  )
}
