/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { CgFeed, CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Sidebar = ({ user, path }) => {
  // Add styles to the current page's link on the sidebar
  const setLink = () => {
    const links = document.querySelectorAll(".link-elem");
    const target = document.querySelector(
      `a[href='/walidbook-client${path === "/" ? "" : path}']`
    );

    links.forEach((link) => {
      link.classList.remove("border-l-4");
      link.classList.remove("border-amber-200");
    });

    target.classList.add("border-l-4");
    target.classList.add("border-amber-200");
  };

  useEffect(() => {
    setLink();
  }, []);

  return (
    <div className="w-full min-w-fit">
      {/* Display user infos at the top */}
      <div className="w-full mb-24 p-7 flex gap-4 items-center">
        <img
          src={
            user.image
              ? user.image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="profile"
          className="w-16 h-16 rounded-xl"
        />
        <div>
          <p className="text-sm font-semibold mb-1 capitalize">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="text-xs lowercase text-slate-500">{user.email}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-7">
        <Link
          to={"/"}
          className="link-elem pl-10 border-l-4 border-amber-200 h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <CgFeed className="text-xl" /> News feed
        </Link>
        <Link
          to={"/user"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <CgProfile className="text-xl" /> Profile
        </Link>
        <Link
          to={"/friends"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <FaUserFriends className="text-xl" /> Friends
        </Link>
        <Link
          to={"/requests"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <HiUserAdd className="text-xl" /> Requests
        </Link>
        <Link
          to={"/find"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <GiThreeFriends className="text-xl" /> Find Friends
        </Link>
        <Link
          to={"/settings"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <IoMdSettings className="text-xl" /> Settings
        </Link>
        <Link
          to={"/logout"}
          className="link-elem pl-10  h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-500 transition-all"
        >
          <RiLogoutBoxRFill className="text-xl" /> Log out
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
