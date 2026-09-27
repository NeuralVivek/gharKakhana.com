import  express  from  "express";
import { addUserRole, fetchProfile, loginUser } from "../controllers/auth.js";
import { isAuth } from "../middlewhere/isauth.js";

  const  router = express.Router();


  router.post("/login", loginUser);
  router.put("/role", isAuth,addUserRole);
  router.get("/me",isAuth,fetchProfile);




   export default  router;