import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import fetchUser from "../utils/fetchUser";
import Loader from "./Loader";

const Friends = ({ user, setUser }) => {
  const [loaded, setLoaded] = useState(false);

  // Fetch user again in case there were changes in friends list
  const getUser = async () => {
    await fetchUser(setUser, setLoaded);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/friends"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-black flex flex-col gap-9 items-center">
          {/* Display loader until user is fetched */}
          {!loaded ? (
            <Loader isChild={true} />
          ) : (
            <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* Display each friend with his infos, show friendly message if user has no friends */}
              {!user.friends.length ? (
                <p className="text-white font-bold">You have no friends.</p>
              ) : (
                user.friends.map((friend) => {
                  return (
                    <div
                      className="p-8 min-h-40 bg-slate-300 text-black flex flex-col items-center gap-4 rounded-lg"
                      key={friend._id}
                    >
                      <img
                        className="w-[100px] h-[100px] rounded-full"
                        src={
                          friend.image ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt="profile"
                      />
                      <Link
                        to={"/user/" + friend._id}
                        className="font-bold capitalize"
                      >
                        {friend.firstName + " " + friend.lastName}
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
