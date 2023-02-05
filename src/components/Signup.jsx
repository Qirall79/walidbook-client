import { Navigate, Link } from "react-router-dom";

const Signup = ({ user, setUser }) => {
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="w-[90%] h-[90%] max-w-[1450px] max-h-[800px] bg-[#002550] flex shadow-2xl rounded-xl">
      <div className="w-1/2 h-full bg-login bg-cover bg-center flex items-center justify-center relative rounded-l-xl">
        <div className="h-full w-full bg-[#1161bd] opacity-60 absolute rounded-l-xl"></div>
        <h1 className="font-bold text-white text-4xl z-10 uppercase">
          Walidbook
        </h1>
      </div>
      <div className="w-1/2 p-32 flex flex-col items-center justify-center">
        <h1 className="self-start w-[120px] mb-10 pb-3 text-3xl font-semibold text-slate-300 border-b-[3px] border-slate-400 ">
          Sign Up
        </h1>
        <form method="post" className="w-full max-h-full flex flex-col gap-5">
          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="first_name"
              className="text-[#0076FC] text-sm font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="last_name"
              className="text-[#0076FC] text-sm font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>

          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#0076FC] text-sm font-medium"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[#0076FC] text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="password_confirmation"
              className="text-[#0076FC] text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
            />
          </div>
          <div className="form-group flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-[#0076FC] text-sm font-medium"
            >
              Profile Picture
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="bg-transparent  text-slate-50 text-sm "
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="self-start bg-[#0077FF] mt-3 px-10 py-2 text-sm font-medium text-white cursor-pointer rounded-2xl hover:bg-[#115fb8] transition-all"
          />
          <p className="text-slate-50">
            Already have an account ?{" "}
            <Link to={"/login"} className="text-[#0077FF] font-medium">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
