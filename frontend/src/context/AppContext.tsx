import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authServies } from "../main";
import axios from "axios";
import type {AppContextType, LocationData, User} from "../types"

interface AppContextProps{
    children: ReactNode;
}
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({children}:AppContextProps)=>{
    const [user,setUser] = useState<User |null>(null);
    const [isAuth,setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);

   
     const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fecthing Location...");


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

    // location fetch 
     useEffect(() => {
    if (!navigator.geolocation)
      return alert("Please Allow Location to continue");
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        setLocation({
          latitude,
          longitude,
          formattedAddress: data.display_name || "current location",
        });

        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            "Your Location"
        );
        setLoadingLocation(false);
      } catch (error) {
        setLocation({
          latitude,
          longitude,
          formattedAddress: "Current Location",
        });
        setCity("Faild to load");
        setLoadingLocation(false);
      }
    });
  }, []);












   return (
    <AppContext.Provider value={{ isAuth,user,loading,setUser,setIsAuth,setLoading,location,
        loadingLocation,
        city, }}>
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
