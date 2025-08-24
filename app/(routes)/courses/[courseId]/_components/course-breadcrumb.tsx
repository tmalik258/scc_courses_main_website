"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseBreadcrumbProps {
  title: string;
  courseId: string;
}

const CourseBreadcrumb = ({ title, courseId }: CourseBreadcrumbProps) => {
  const [breadcrumbTitle, setBreadcrumbTitle] = useState<string>(title);

  useEffect(() => {
    setBreadcrumbTitle(title);
  }, [title]);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 ml-37">
      <Link
        href="/courses"
        className="hover:underline text-primary font-medium"
      >
        Courses
      </Link>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
      <Link
        href={`/courses/${courseId}`}
        className="truncate text-primary font-medium max-w-[250px] sm:max-w-[400px] hover:underline"
      >
        {breadcrumbTitle || "Loading..."}
      </Link>
    </nav>
  );
};

export default CourseBreadcrumb;
