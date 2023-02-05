import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import Home from "./components/Home";
// eslint-disable-next-line no-unused-vars
import styles from "./index.css";

const BrowserSwitch = ({ user, setUser }) => {
  return (
    <div className="w-screen h-screen bg-[#0077FF] flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login user={user} setUser={user} />} />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={user} />}
          />
          <Route path="/user" element={<User user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default BrowserSwitch;
