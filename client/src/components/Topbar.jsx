import logo from "@/assets/logo-white.png"
import { SearchBox } from "./SearchBox"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import userimage from "@/assets/user.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiBloggerLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { removeUser } from "@/redux/user/user.Slice";

export const Topbar = () => {
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.user);
    let avatar=user.user.avatar || userimage;
    const navigate= useNavigate();

    const handleLogout=async ()=>{
     const response=await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/auth/logout`,{
        method:'get',
        credentials:'include',
      });
      const body=await response.json();
       if(!response.ok){
       alert(body.message); 
       return;
        }
        dispatch(removeUser());
       navigate('/');
       alert(body.message);
      
    }
    // console.log();
    return (
        <div className="flex justify-between items-center w-full h-[10vh] bg-white fixed z-20">
            <img src={logo} alt="" />
            <SearchBox />
         {!user.userloggedin?
         <>
            <Button className="rounded-full" asChild>
                <Link to="/signin">
                    <MdLogin />
                    Login
                </Link>

            </Button>
            </>
            :
            
            <>
            <DropdownMenu>
  <DropdownMenuTrigger><Avatar>
  <AvatarImage src={avatar}/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel><p>{user.user.name}</p><p className="text-sm">{user.user.email}</p></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem> <Link to="/profile" className="flex w-full cursor-pointer"><FaRegCircleUser />Profile</Link></DropdownMenuItem>
    <DropdownMenuItem> <Link to="" className="flex w-full cursor-pointer"><RiBloggerLine />Add Blog</Link></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="w-full" onClick={handleLogout}>
        <CiLogout className="text-red-600" />Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            </>
         }
            
        </div>
    )
}