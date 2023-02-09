/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { CgFeed, CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const Sidebar = ({ user, path }) => {
  const setLink = () => {
    const links = document.querySelectorAll(".link-elem");
    const target = document.querySelector(`a[href='${path}']`);

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
    <div className="">
      <div className="mb-24 p-7 flex gap-4 items-center">
        <img
          src={user.image ? user.image : "../images/none.webp"}
          alt="profile"
          className="w-16 rounded-xl"
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
      </ul>
    </div>
  );
};

export default Sidebar;
