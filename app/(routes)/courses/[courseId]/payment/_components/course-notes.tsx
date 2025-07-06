import { AlertTriangle } from "lucide-react"

export function CourseNotes() {
  const notes = [
    "Course access is available permanently after successful payment.",
    "Certificate will be issued under your SmartCoding account details.",
  ]

  return (
    <div className="space-y-4">
      <h3 className="md:text-lg font-semibold text-gray-800">Notes</h3>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="flex items-start space-x-3 max-md:text-sm">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
