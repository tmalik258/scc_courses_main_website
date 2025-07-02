import { FileText, Download } from "lucide-react"

export function FilesList() {
  const files = [
    "Real World Use Cases of Automation.pdf",
    "Scheduling with Cron and Python Scripts.pdf",
    "Data Collection Automation with BeautifulSoup.ipynb",
  ]

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {files.map((fileName, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <FileText className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{fileName}</p>
            </div>
            <button className="text-gray-400 hover:text-blue-500">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
