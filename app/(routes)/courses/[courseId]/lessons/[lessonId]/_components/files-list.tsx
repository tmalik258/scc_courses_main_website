"use client";

import { FileText, Download } from "lucide-react";

interface FilesListProps {
  resources?: { id: string; name: string; url: string }[];
}

export function FilesList({ resources = [] }: FilesListProps) {
  const defaultFiles = [
    { id: "1", name: "Real World Use Cases of Automation.pdf", url: "#" },
    { id: "2", name: "Scheduling with Cron and Python Scripts.pdf", url: "#" },
    {
      id: "3",
      name: "Data Collection Automation with BeautifulSoup.ipynb",
      url: "#",
    },
  ];

  const files = resources.length > 0 ? resources : defaultFiles;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <FileText className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
            </div>
            <a
              href={file.url}
              download
              className="text-gray-400 hover:text-blue-500"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
