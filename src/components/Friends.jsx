import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Friends = ({ user }) => {
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/friends"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-black flex flex-col gap-9 items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                      className="w-[100px] rounded-full"
                      src={friend.image || "../images/none.webp"}
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
        </div>
      </div>
    </div>
  );
};

export default Friends;
