import { FcGoogle } from "react-icons/fc"
import { Button } from "./ui/button"
import { signInWithPopup } from "firebase/auth"
// import { auth, provider } from "@/helpers/firebase"
// import { auth,provider } from "firebase.js"
import { auth,provider } from "./firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addUser } from "@/redux/user/user.Slice"

export const Googlelogin=()=>{
  const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin=async ()=>{
        const googleResponse=await signInWithPopup(auth,provider);
        const user=googleResponse.user;
        const bodydata={
            name:user.displayName,
            email:user.email,
            avatar:user.photoURL
        }
        const response=await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/auth/googlelogin`,{
            method:'post',
            headers:{'Content-type':'application/json'},
            credentials:'include',
            body:JSON.stringify(bodydata)
          });
          const body=await response.json();
        if(!response.ok){
        alert(body.message);
        return;
        }
        dispatch(addUser(body.user));
        navigate('/');
          alert(body.message);
          
          return;
    }
    return(
        <Button onClick={handleLogin} className="border border-black rounded-full bg-white text-black">
                       <FcGoogle />
                         Continue With Google             </Button>
    )
}