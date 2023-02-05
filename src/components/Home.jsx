import { Navigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] ">
      {user ? (
        <h1 className="text-sm">User exists, display feed.</h1>
      ) : (
        <h1>User will be redirected to login.</h1>
      )}
    </div>
  );
};

export default Home;
