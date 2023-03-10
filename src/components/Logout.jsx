import { useEffect } from "react";
import Loader from "./Loader";
import Sidebar from "./Sidebar";

const Logout = ({ user }) => {
  // Remove user token and redirect to homepage
  useEffect(() => {
    localStorage.removeItem("token");
    setTimeout(() => {
      // Can't redirect to login page directly because github pages will consider it a different route
      // and therefore look for a response from server, since our routing is done client side we will get an error 404
      window.location.href = "https://qirall79.github.io/walidbook-client/";
    }, 1000);
  }, []);
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/logout"} />

      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-white flex flex-col gap-9 items-center">
          <Loader isChild={true} />
        </div>
      </div>
    </div>
  );
};

export default Logout;
