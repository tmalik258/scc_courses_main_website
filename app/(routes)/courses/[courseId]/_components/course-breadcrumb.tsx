"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseBreadcrumbProps {
  courseId: string;
}

const CourseBreadcrumb = ({ courseId }: CourseBreadcrumbProps) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setTitle(data.title || "Untitled Course");
      } catch (error) {
        console.error("Error fetching course title:", error);
        setTitle("Course");
      }
    };

    fetchTitle();
  }, [courseId]);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 ml-37">
      <Link
        href="/courses"
        className="hover:underline text-primary font-medium"
      >
        Courses
      </Link>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
      <span className="truncate text-primary font-medium max-w-[250px] sm:max-w-[400px]">
        {title || "Loading..."}
      </span>
    </nav>
  );
};

export default CourseBreadcrumb;
