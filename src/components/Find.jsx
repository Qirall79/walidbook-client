import { useEffect, useState } from "react";
import fetchAllUsers from "../utils/fetchAllUsers";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Find = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const filterUsers = (e) => {
    const value = e.target.value;
    const filtered = users.filter((u) =>
      `${u.firstName.toLowerCase()}${u.lastName.toLowerCase()}`.includes(
        value.toLowerCase()
      )
    );
    setFilteredUsers([...filtered]);
  };

  const getUsers = async () => {
    const fetchedUsers = await fetchAllUsers(user);
    setUsers([...fetchedUsers]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/find"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-white flex flex-col gap-9 items-center overflow-auto">
          <div className="w-full p-5">
            <form className="w-full">
              <input
                className="text-black w-full outline-none h-10 px-5 rounded-lg"
                type="text"
                name="name"
                id="name"
                placeholder="Search users..."
                onChange={filterUsers}
              />
            </form>
          </div>

          <div className="w-full px-5 flex flex-col gap-2">
            {filteredUsers.map((user) => {
              return (
                <div
                  className="max-w-[500px] flex items-center gap-5 bg-slate-800 py-3 px-7 rounded-lg"
                  key={user._id}
                >
                  <img
                    className="w-[55px] rounded-full"
                    src={user.image || "./images/none.webp"}
                    alt="profile"
                  />
                  <Link
                    to={"/user/" + user._id}
                    className="capitalize font-bold"
                  >
                    {user.firstName + " " + user.lastName}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
