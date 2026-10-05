import {useState,useEffect} from "react";
import type {IRestaurant} from "../types";
import axios from "axios";


import {restaurantService} from "../main";
import AddRestaurant from "../components/addresturent";

 const Restaurant = ()=>{
  const [restaurant,setRestaurant] = useState<IRestaurant | null>(null);
  const [loading,setLoading] = useState<boolean>(true);
  const fetchRestaurant = async ()=>{

    try{
      const {data} = await  axios.get(`${restaurantService}/api/restaurant/my`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`

        },
      });
      setRestaurant(data.restaurant || null);
      setLoading(false);

      if(data.token){
        localStorage.setItem("token",data.token);

      }

    }catch(error){
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to fetch restaurant:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Failed to fetch restaurant:", error);
      }
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);
  if(loading){
    return <div className="flex-min-h-screen items-centre justify-center">
      <p  className="text-gray-500"> loading your restaurant</p>


    </div>
  }
    if(!restaurant){
    return <AddRestaurant fetchMyRestaurant={fetchRestaurant} />
    }
    return <div>Restaurant</div>

}
export default Restaurant;