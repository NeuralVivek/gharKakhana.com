import {useAppData} from "../context/AppContext";
import {Navigate,Outlet} from "react-router-dom";

const PublicRoute = ()=>{
    const {isAuth,loading} = useAppData();
    if(loading){
        return null;
    }
  return isAuth ? <Navigate to="/" replace/> : <Outlet/>
}
export default PublicRoute;
// if user logged hai too usko login page show nahi karna hai
// if user logged in hai too usko login page show karna hai
//Outlet ka mtlan ye hai ki  agar user login nahi hai too usko login page show kar dega 
// kyu jo url me hoga usko component ko return kar  dega  