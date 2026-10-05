import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
// import Login from "./pages/Login";
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast";
import PublicRoute from './components/publicRoute';
import ProtectedRoute from './components/protectedRoute';
import  SeclectRole from './pages/SeclectRole';
import Navbar from './components/navbar';
import Account from './pages/Account';
import { useAppData } from './context/AppContext';
import Restaurant from './pages/Restaurant';

const App = () => {
  const { user, loading } = useAppData();

  if (loading) {
    return (
      <h1 className="text-2xl font-bold text-red-500 text-center mt-56">
        Loading...
      </h1>
    );
  }

  if (user && user.role === "seller") {
    return <Restaurant />;
  }


  return (
    <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route element={<PublicRoute/>}>
     <Route path="/login" element={<Login />} />
    </Route>
     <Route element={<ProtectedRoute/>}>
     <Route path="/" element={<Home />} />
     <Route path="/account" element={<Account/>}/>
     <Route path="/select-role" element={<SeclectRole/>}/>
    </Route>
    
    
  </Routes>
  <Toaster/>
  </BrowserRouter>
  
  
  
  
  </>
  )
}

export default App
