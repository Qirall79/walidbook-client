import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Settings from "./components/Settings";
import Logout from "./components/Logout";

const BrowserSwitch = ({ user, setUser }) => {
  return (
    <div className="w-screen h-screen bg-[#0077FF] flex items-center justify-center">
      <HashRouter basename="/walidbook-client">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Navigate to={"/"} />} />
          <Route
            path="/friends"
            element={
              user ? <Friends user={user} /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/requests"
            element={
              user ? <Requests user={user} /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/find"
            element={user ? <Find user={user} /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/logout"
            element={user ? <Logout user={user} /> : <Navigate to={"/"} />}
          />
          <Route
            path="/settings"
            element={
              user ? (
                <Settings user={user} setUser={setUser} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />

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
          <Route
            path="/user"
            element={
              user ? <CurrentUser user={user} /> : <Navigate to={"/login"} />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default BrowserSwitch;
