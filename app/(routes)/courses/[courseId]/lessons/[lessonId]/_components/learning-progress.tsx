import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningProgressProps {
  isPaid: boolean;
  handleJoinCourse: () => void;
}

export function LearningProgress({ isPaid, handleJoinCourse }: LearningProgressProps) {
  return (
    <div className="border border-gray-200 p-4 rounded">
      <h3 className="font-medium text-gray-800 mb-2">Learning Progress</h3>
      <p className="text-sm text-gray-600 mb-3">2/50 Lessons</p>

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "5%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span></span>
          <span>5%</span>
        </div>
      </div>

      {isPaid ? (
        <>
          {/* Download Certificate */}
          <button className="flex items-center space-x-2 text-gray-400 text-sm mb-4 hover:text-gray-600">
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
        </>
      ) : (
        // Join Course Button
        <Button className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 cursor-pointer" onClick={handleJoinCourse}>
          Join Course
        </Button>
      )}
    </div>
  );
}
