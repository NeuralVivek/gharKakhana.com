import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authServies } from "../main";
import axios from "axios";
import type {AppContextType, User} from "../types"

interface AppContextProps{
    children: ReactNode;
}
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({children}:AppContextProps)=>{
    const [user,setUser] = useState<User |null>(null);
    const [isAuth,setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);

    const [location,setLocation] = useState(null);
    const [loadingLocation,setLoadingLocation] = useState(false);
    const [city,setCity] = useState("Feching location...");

    async function fetchUser(){
        const token = localStorage.getItem("token");
        if(!token){
            setLoading(false);
            return;
        }

        try{
            const {data} = await axios.get(`${authServies}/api/auth/me`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
                
            });
            setUser(data.user);
            setIsAuth(true);

        } catch (error){
            console.log(error);

        }finally{
            setLoading(false);
        }
        


    }

    useEffect(()=>{
        fetchUser();
    },[]);

   return (
    <AppContext.Provider value={{ isAuth,user,loading,setUser,setIsAuth,setLoading,location }}>
        {children}
    </AppContext.Provider>
);

};



export const useAppData = (): AppContextType =>{
    const context = useContext(AppContext);
    if(!context){
        throw new Error("useAppData must be used within AppProvider");
        
    }
    return context;
}
