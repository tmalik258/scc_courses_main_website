"use client"

export function CourseTopicChart() {
  const topics = [
    { name: "AI Calling", color: "bg-green-400", percentage: 25 },
    { name: "Data Science", color: "bg-blue-400", percentage: 25 },
    { name: "WhatsApp Chatbot", color: "bg-purple-400", percentage: 12.5 },
    { name: "App Development", color: "bg-pink-400", percentage: 12.5 },
    { name: "Make Automations", color: "bg-yellow-400", percentage: 12.5 },
    { name: "Web Development", color: "bg-cyan-400", percentage: 12.5 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Course Topic</h3>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            {/* AI Calling - Green */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="25, 75"
              strokeDashoffset="0"
            />
            {/* Data Science - Blue */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="25, 75"
              strokeDashoffset="-25"
            />
            {/* Other topics */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeDasharray="12.5, 87.5"
              strokeDashoffset="-50"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
              strokeDasharray="12.5, 87.5"
              strokeDashoffset="-62.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="12.5, 87.5"
              strokeDashoffset="-75"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="12.5, 87.5"
              strokeDashoffset="-87.5"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">8</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
            <span className="text-sm text-gray-600">{topic.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
