"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Bookmark, CreditCard } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeItem, setActiveItem] = useState("dashboard")

  useEffect(() => {
    // Set active item based on current pathname
    if (pathname === "/dashboard") {
      setActiveItem("dashboard")
    } else if (pathname === "/dashboard/my-courses") {
      setActiveItem("my-course")
    } else if (pathname === "/dashboard/saved-courses") {
      setActiveItem("saved-course")
    } else if (pathname === "/dashboard/payments") {
      setActiveItem("payment")
    }
  }, [pathname])

  const menuItems = [
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
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                activeItem === item.id
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
