import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IoMdHome } from "react-icons/io";

import { BiSolidCategory } from "react-icons/bi";
import { FaMicroblog, FaComment, FaUsers, FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png"
const Headertitles = ({ name, to, icon }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>

        <Link to={to} className="flex text-xl items-center gap-2">{icon}{name}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
export function AppSidebar() {
  return (
    <Sidebar className="bg-white top-[10vh]">
      {/* <SidebarHeader className="bg-white flex items-center">
        <img src={logoWhite}/>
      </SidebarHeader> */}
      <SidebarContent >
        <SidebarGroup>
          <SidebarMenu>
            <Headertitles name="Home" to="/" icon={<IoMdHome />} />
            <Headertitles name="Categories" to="/categories" icon={<BiSolidCategory />} />
            <Headertitles name="Blogs" to="" icon={<FaMicroblog />} />
            <Headertitles name="Comments" to="" icon={<FaComment />} />
            <Headertitles name="Users" to="" icon={<FaUsers />} />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to="" className="flex  items-center gap-2"><FaRegCircle />Items</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
