import { Navigate, Link } from "react-router-dom";

const Login = ({ user, setUser }) => {
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="w-[90%] h-[90%] max-w-[1450px] max-h-[800px] bg-[#002550] flex shadow-2xl rounded-xl">
      <div className="w-1/2 h-full bg-login bg-cover bg-center flex items-center justify-center relative rounded-l-xl">
        <div className="h-full w-full bg-[#1161bd] opacity-60 absolute rounded-l-xl"></div>
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="w-28 scale-125">
            <img
              src="../images/logo.png"
              alt="logo"
              className="z-10 max-w-full rounded-full "
            />
          </div>
          <h1 className="text-3xl font-mono font-bold uppercase text-white tracking-widest">
            Walidbook
          </h1>
        </div>
      </div>
      <div className="w-1/2 p-32 flex flex-col items-center justify-center">
        <h1 className="self-start w-[100px] mb-20 pb-3 text-3xl font-semibold text-slate-300 border-b-[3px] border-slate-400 ">
          Login
        </h1>
        <form method="post" className="w-full flex flex-col gap-10">
          <div className="form-group flex flex-col gap-3">
            <label htmlFor="email" className="text-[#0076FC] font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <div className="form-group flex flex-col gap-3">
            <label htmlFor="password" className="text-[#0076FC] font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="self-start bg-[#0077FF] px-10 py-2 text-sm font-medium text-white cursor-pointer rounded-2xl hover:bg-[#115fb8] transition-all"
          />
          <p className="text-slate-50">
            Don't have an account ?{" "}
            <Link to={"/signup"} className="text-[#0077FF] font-medium">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
