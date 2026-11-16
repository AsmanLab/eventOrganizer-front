import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProtectedRoute from "./admin-route";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-gray-50">
          <SidebarTrigger />
          <div
            vaul-drawer-wrapper=""
            className="relative p-4 md:p-8 mx-auto max-w-[1460px] h-full"
          >
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
