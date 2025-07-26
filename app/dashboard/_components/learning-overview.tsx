"use client";

import { ArrowRight, Play, CheckCircle, Award } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

interface LearningOverviewProps {
  ongoingCount: number;
  completedCount: number;
  certificateCount: number;
}

export function LearningOverview({
  ongoingCount,
  completedCount,
  certificateCount,
}: LearningOverviewProps) {
  const router = useRouter();

  const overviewCards = [
    {
      title: "Ongoing",
      count: `${ongoingCount} Course${ongoingCount !== 1 ? "s" : ""}`,
      icon: Play,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      route: "/dashboard/ongoing-courses",
    },
    {
      title: "Completed",
      count: `${completedCount} Course${completedCount !== 1 ? "s" : ""}`,
      icon: CheckCircle,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      route: "/dashboard/completed-courses",
    },
    {
      title: "Certificate",
      count: `${certificateCount}`,
      icon: Award,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
      route: "/dashboard/certificate",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Learning Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => router.push(card.route)}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`${card.iconBg} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{card.count}</p>
              </div>
            </div>
            <button className="flex items-center text-aqua-mist hover:text-aqua-depth text-sm font-medium cursor-pointer">
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
