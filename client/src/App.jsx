import { Button } from "antd";
import{useSelector} from"react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Profile from "./pages/profile/Profile";

function App() {
  const {loading}=useSelector(state=>state.loaders)
  return (
    <>
   { loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
        <Route path="/profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
