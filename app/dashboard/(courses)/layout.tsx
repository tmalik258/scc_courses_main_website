"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import { useRouter } from "nextjs-toploader/app";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Get page info based on pathname
  const getPageInfo = () => {
    switch (pathname) {
      case "/dashboard/ongoing-courses":
        return {
          title: "Ongoing Courses",
          breadcrumbText: "Ongoing",
          showBreadcrumb: true,
          showFilters: true,
          showHeader: true,
        };
      case "/dashboard/completed-courses":
        return {
          title: "Completed Courses",
          breadcrumbText: "Completed",
          showBreadcrumb: true,
          showFilters: true,
          showHeader: true,
        };
      case "/dashboard/certificates":
        return {
          title: "Completed Courses",
          breadcrumbText: "Certificate",
          showBreadcrumb: true,
          showFilters: true,
          showHeader: true,
        };
      case "/dashboard/my-courses":
        return {
          title: "My Course",
          breadcrumbText: "My Course",
          showBreadcrumb: false,
          showFilters: true,
          showHeader: true,
        };
      case "/dashboard/saved-courses":
        return {
          title: "Saved Course",
          breadcrumbText: "Saved Course",
          showBreadcrumb: false,
          showFilters: true,
          showHeader: true,
        };
      case "/dashboard/payments":
        return {
          title: "Payment",
          breadcrumbText: "Payment",
          showBreadcrumb: false,
          showFilters: false,
          showHeader: true,
        };
      default:
        return {
          title: "Courses",
          breadcrumbText: "Courses",
          showBreadcrumb: true,
          showFilters: true,
          showHeader: true,
        };
    }
  };

  const { title, breadcrumbText, showBreadcrumb, showFilters, showHeader } = getPageInfo();

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb - Only show for non-my-course pages */}
        {pathname !== "/my-course" && showBreadcrumb && (
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <div
                onClick={() => router.push("/dashboard")}
                className="hover:text-gray-800 cursor-pointer"
              >
                Dashboard
              </div>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-aqua-mist">{breadcrumbText}</span>
            </div>
          </div>
        )}

        {/* Header */}
        {showHeader && (
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              {title}
            </h1>

            {/* Show search and filters for most pages */}
            {showFilters && (
              <div className="flex items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search for courses"
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>

                {/* Category Filter */}
                <Suspense fallback={<div>Loading...</div>}>
                  <Select defaultValue="all">
                    <SelectTrigger className="md:w-40 bg-white border-gray-200">
                      <SelectValue placeholder="All Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Category</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="whatsapp-chatbots">
                        WhatsApp Chatbots
                      </SelectItem>
                      <SelectItem value="ai-calling">AI Calling</SelectItem>
                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="app-development">
                        App Development
                      </SelectItem>
                      <SelectItem value="make-automations">
                        Make Automations
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Suspense>
              </div>
            )}
          </div>
        )}

        {/* Page Content */}
        {children}
      </div>
    </main>
  );
};

export default Layout;
