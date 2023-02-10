import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import fetchUser from "../utils/fetchUser";
import Loader from "./Loader";

const Requests = ({ user, setUser }) => {
  const [loaded, setLoaded] = useState(false);

  const getUser = async () => {
    await fetchUser(setUser, setLoaded);
  };

  useEffect(() => {
    getUser();
  });
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/requests"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-white flex flex-col gap-9 items-center overflow-y-auto overflow-x-hidden">
          {!loaded ? (
            <Loader isChild={true} />
          ) : (
            <div className="w-full p-5">
              {!user.receivedRequests.length ? (
                <p className="font-bold translate-x-20">
                  You have no friend requests.
                </p>
              ) : (
                user.receivedRequests.map((req) => {
                  console.log(req);
                  return (
                    <div
                      className="max-w-[500px] flex items-center gap-5 bg-slate-800 py-3 px-7 rounded-lg"
                      key={req._id}
                    >
                      <img
                        className="w-[55px] h-[55px] rounded-full"
                        src={
                          req.image ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt="profile"
                      />
                      <Link
                        to={"/user/" + req._id}
                        className="capitalize font-bold"
                      >
                        {req.firstName + " " + req.lastName}
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

export default Requests;
