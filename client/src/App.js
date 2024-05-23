import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Singup from "./components/Singup";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import Aevents from "./components/Aevents";
import Uevent from "./components/Uevent";
import Addevent from "./components/Addevent";
import AddAdmin from "./components/AddAdmin";
import Myevent from "./components/Myevent";
import Logout from "./components/Logout";
import Edit from "./components/Edit";
import Registereduser from "./components/Registereduser";
const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Home/> } ></Route>
      <Route path="/about" element={<Profile/> } ></Route>
      <Route path="/login" element={<Login/> } ></Route>
      <Route path="/signup" element={<Singup/> } ></Route>
      <Route path="/admin" element={<Admin/> } ></Route>
      <Route path="/userhome" element={<UserHome/> } ></Route>
      <Route path="/adminhome" element={<AdminHome/> } ></Route>
      <Route path="/aevents" element={<Aevents/> } ></Route>
      <Route path="/uevents" element={<Uevent/> } ></Route>
      <Route path="/addevent" element={<Addevent/> } ></Route>
      <Route path="/addadmin" element={<AddAdmin/> } ></Route>
      <Route path="/myevents" element={<Myevent/> } ></Route>
      <Route path="/logout" element={<Logout/> } ></Route>
      <Route path="/edit/:id" element={<Edit/> } ></Route>
      <Route path="/registrations/:id" element={<Registereduser/> } ></Route>
    </Routes>
  );
};

export default App;
