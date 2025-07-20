"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "nextjs-toploader/app";

const Header = () => {
  const router = useRouter();
  // Simulating user authentication state
  // In a real application, you would fetch this from your authentication context or state management
  const user = null;

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-24 h-12 bg-white rounded-full flex items-center justify-center">
          <div
            className="flex items-center justify-center w-full h-full cursor-pointer"
            onClick={() => handleRedirect("/")}
          >
            <Image
              src="/logo.png"
              width={30}
              height={30}
              className="w-full h-full object-contain"
              alt="logo"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8 font-medium text-base">
        <div
          onClick={() => handleRedirect("/courses")}
          className="text-gray-700 hover:text-cyan-500 transition-colors cursor-pointer"
        >
          Courses
        </div>
        <div
          onClick={() => handleRedirect("/about-us")}
          className="text-gray-700 hover:text-cyan-500 transition-colors cursor-pointer"
        >
          About Us
        </div>
        <div
          onClick={() => handleRedirect("/reviews")}
          className="text-gray-700 hover:text-cyan-500 transition-colors cursor-pointer"
        >
          Reviews
        </div>
        <div
          onClick={() => handleRedirect("/about-me")}
          className="text-gray-700 hover:text-cyan-500 transition-colors cursor-pointer"
        >
          About Me
        </div>
      </nav>

      {user ? (
        // Admin Dropdown
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
              <Image
                src="/images/profile.jpg"
                width={30}
                height={30}
                className="w-10 h-10 rounded-lg object-cover object-top"
                alt="Profile"
              />
              <span className="text-gray-700">Admin</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="!all-[initial]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem variant="default">Settings</DropdownMenuItem>
              <DropdownMenuItem variant="default">Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // login buttons
        <div className="flex items-center space-x-3">
          <div
            onClick={() => handleRedirect("/login")}
            className="text-gray-700 hover:text-cyan-500 transition-colors cursor-pointer"
          >
            Login
          </div>
          <div
            onClick={() => handleRedirect("/register")}
          >
            <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">Register</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
