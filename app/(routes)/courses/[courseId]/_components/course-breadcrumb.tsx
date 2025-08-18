"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseBreadcrumbProps {
  title: string;
}

const CourseBreadcrumb = ({ title }: CourseBreadcrumbProps) => {
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
      <span className="truncate text-primary font-medium max-w-[250px] sm:max-w-[400px]">
        {breadcrumbTitle || "Loading..."}
      </span>
    </nav>
  );
};

export default CourseBreadcrumb;
