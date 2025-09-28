import { AppSidebar } from "@/components/app-sidebar";
import { SidebarContextProvider } from "@/context/sidebar-context";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 min-w-0">
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
