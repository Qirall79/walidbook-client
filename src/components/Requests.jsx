import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Requests = ({ user }) => {
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/requests"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-white flex flex-col gap-9 items-center overflow-auto">
          <div className="w-full p-5">
            {!user.receivedRequests.length
              ? "You have no friend requests."
              : user.receivedRequests.map((req) => {
                  return (
                    <div
                      className="max-w-[500px] flex items-center gap-5 bg-slate-800 py-3 px-7 rounded-lg"
                      key={req._id}
                    >
                      <img
                        className="w-[55px] rounded-full"
                        src={req.image || "../images/none.webp"}
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
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
