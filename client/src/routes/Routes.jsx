import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/Layout/Layout";
import { Home } from "@/components/Home";
import { Signin } from "@/components/Signin";
import { Signup } from "@/components/Signup";
import { Profile } from "@/components/Profile";
import { Categories} from "@/components/Categories";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
{
    path:'',
    element:<Home />
},
{
    path:'profile',
    element:<Profile />
},
{
    path:'categories',
    element:<Categories />
}

        ]
    },
    {
        path:'/signin',
        element:<Signin />
    },
    {
        path:'/signup',
        element:<Signup />
    }
]
)
export default router;