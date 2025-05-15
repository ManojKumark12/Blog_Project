import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSideBar"
import { Topbar } from "@/components/Topbar"
import { Outlet } from "react-router-dom"
import { Footer } from "@/components/Footer"
export const Layout = () => {
    return (
<>

        <SidebarProvider>
            <Topbar />{/* Has a file */}
            <AppSidebar />{/* Has a file */}
            <main className="w-[100%] h-[90vh] mt-[10vh]">
                <div className="h-[85vh]">
                <Outlet />
                </div>
                <Footer />{/* Has a file */}
            </main>
        </SidebarProvider>
        </>


    )
}