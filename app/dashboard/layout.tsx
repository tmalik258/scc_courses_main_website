import Header from "@/components/header";
import { DashboardSidebar } from "./_components/dashboard-sidebar";

const Layout = ({ children: children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <DashboardSidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
