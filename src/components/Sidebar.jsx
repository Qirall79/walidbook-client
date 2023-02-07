import { CgFeed, CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";

const Sidebar = ({ user }) => {
  return (
    <div className="">
      <div className="mb-24 p-7 flex gap-4 items-center">
        <img
          src={user.image || "./images/none.webp"}
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
        <li className="pl-10 border-l-4 border-amber-200 h-10 flex items-center gap-6 cursor-pointer hover:bg-amber-300 transition-all">
          <CgFeed className="text-xl" />
          <a href="http://localhost:5000/">News Feed</a>
        </li>
        <li className="pl-10  h-10 flex items-center  gap-6 cursor-pointer hover:bg-amber-300 transition-all">
          <CgProfile className="text-xl" />
          <a href="http://localhost:5000/">Profile</a>
        </li>
        <li className="pl-10  h-10 flex items-center  gap-6 cursor-pointer hover:bg-amber-300 transition-all">
          <FaUserFriends className="text-xl" />
          <a href="http://localhost:5000/">Friends</a>
        </li>
        <li className="pl-10  h-10 flex items-center  gap-6 cursor-pointer hover:bg-amber-300 transition-all">
          <HiUserAdd className="text-xl" />
          <a href="http://localhost:5000/">Requests</a>
        </li>
        <li className="pl-10  h-10 flex items-center  gap-6 cursor-pointer hover:bg-amber-300 transition-all">
          <GiThreeFriends className="text-xl" />
          <a href="http://localhost:5000/">Find Friends</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
