import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import CurrentUser from "./components/CurrentUser";
import Home from "./components/Home";
import Friends from "./components/Friends";
// eslint-disable-next-line no-unused-vars
import styles from "./index.css";
import Requests from "./components/Requests";
import Find from "./components/Find";

const BrowserSwitch = ({ user, setUser }) => {
  return (
    <div className="w-screen h-screen bg-[#0077FF] flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Navigate to={"/"} />} />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route path="/requests" element={<Requests user={user} />} />
          <Route path="/find" element={<Find user={user} />} />
          <Route
            path="/user/:userId"
            element={
              user ? (
                <User currentUser={user} setCurrentUser={setUser} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route path="/user" element={<CurrentUser user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default BrowserSwitch;
