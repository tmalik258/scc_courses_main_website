"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  Search,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { createClient } from "@/utils/supabase/client";
import { UserProfile, getDisplayName } from "@/types/user";
import { signout } from "@/actions/auth";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, } = await supabase.auth.getUser();
      if (user) {
        // Assuming user.user_metadata.full_name exists from Supabase
        setUser({
          id: user.id,
          email: user.email || '',
          fullName: user.user_metadata?.full_name || null,
        });
      }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleRedirect = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: "Courses", path: "/courses" },
    // { label: "About Us", path: "/about-us" },
    // { label: "Reviews", path: "/reviews" },
    // { label: "About Me", path: "/about-me" },
  ];

  const dashboardItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "my-course",
      label: "My Course",
      icon: BookOpen,
      href: "/dashboard/my-courses",
    },
    {
      id: "saved-course",
      label: "Saved Course",
      icon: Bookmark,
      href: "/dashboard/saved-courses",
    },
    {
      id: "payment",
      label: "Payment",
      icon: CreditCard,
      href: "/dashboard/payments",
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await signout();
    if (result?.error) {
      toast.error(result.error);
    }
    setIsLoggingOut(false);
  };

  return (
    <>
      <header className="flex sticky top-0 z-50 items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.89 8.66699H27.7789M5.55664 17.0003H27.7789H9.72331M5.55664 25.3337H19.4455"
              stroke="#1C1C1C"
              strokeWidth="1.5625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center flex-1">
          <div className="w-20 h-10 md:h-12 bg-white rounded-full flex items-center justify-center">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium text-base flex-1 justify-center">
          {navigationItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleRedirect(item.path)}
              className="text-gray-700 hover:text-aqua-mist transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-3 md:flex-1 justify-end">
          <div className="md:hidden mr-2">
            <Search className="w-5 h-5 text-gray-600" />
          </div>
          {user ? (
            // Admin Dropdown
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                <Image
                  src="/images/profile.jpg"
                  width={30}
                  height={30}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover object-top"
                  alt="Profile"
                />
                <span className="text-gray-700 hidden md:block">
                  {user ? getDisplayName(user) : ""}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 hidden md:block"
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
                <DropdownMenuItem onClick={() => handleRedirect("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRedirect("/dashboard/my-courses")}>
                  My Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRedirect("/dashboard/saved-courses")}>
                  Saved Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRedirect("/dashboard/payments")}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Login buttons
            <div className="flex items-center space-x-2 md:space-x-3">
              <button
                onClick={() => handleRedirect("/login")}
                className="text-gray-700 md:hover:text-aqua-mist max-md:px-4 max-md:py-2 max-md:rounded-md max-md:bg-aqua-mist max-md:hover:bg-aqua-depth max-md:text-white transition-colors cursor-pointer text-sm md:text-base px-2 md:px-0"
              >
                Log in
              </button>
              <Button
                onClick={() => handleRedirect("/signup")}
                className="bg-aqua-mist hover:bg-aqua-depth cursor-pointer text-sm md:text-base px-3 md:px-4 py-2 max-md:hidden"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        } md:hidden fixed top-0 z-50 bg-black bg-opacity-50 transition-all duration-300 ease-in-out`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`bg-white w-screen ${
            isMobileMenuOpen ? "clip-path-inset-0" : "clip-path-inset-full"
          } transition-all duration-300 ease-in-out shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="w-14 flex items-center space-x-2">
              <Image
                src="/logo.png"
                width={24}
                height={24}
                className="w-full h-fullobject-contain"
                alt="logo"
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-4">
            {pathname.includes("/dashboard")
              ? dashboardItems.map((item) => (
                  <div
                    key={item.href}
                    onClick={() => handleRedirect(item.href)}
                    className="flex gap-4 items-center text-gray-700 hover:text-aqua-mist transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                ))
              : navigationItems.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => handleRedirect(item.path)}
                    className="block text-gray-700 hover:text-aqua-mist transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    {item.label}
                  </div>
                ))}

            {/* Mobile Auth Section */}
            {!user && (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={() => handleRedirect("/login")}
                  className="block w-full text-left text-gray-700 hover:text-aqua-mist transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  disabled={isLoggingOut}
                >
                  Log in
                </button>
                <Button
                  onClick={() => handleRedirect("/signup")}
                  className="w-full bg-aqua-mist hover:bg-aqua-depth cursor-pointer"
                >
                  Register
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
