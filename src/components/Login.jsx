import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import loginUser from "../utils/loginUser";
import Loader from "./Loader";
import fetchUser from "../utils/fetchUser";

const Login = ({ user, setUser }) => {
  const [response, setResponse] = useState({ success: false });
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSent(true);
    await loginUser(data, setResponse, setSent, setUser);
  };

  // Log in user as visitor by storing the token
  const loginAsVisitor = async () => {
    setSent(true);
    localStorage.setItem(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZTc2NWI2ZGM1MzkwODYxZTE1YTZjOSIsImZpcnN0TmFtZSI6IlZpc2kiLCJsYXN0TmFtZSI6IlRvciIsImVtYWlsIjoidmlzaXRvckBnbWFpbC5jb20ifSwiaWF0IjoxNjc2MTA5MjM5fQ.vpuhlkS7qXfGnhdWykciPHM04XIV014nq6ofr6nqsOc"
    );
    await fetchUser(setUser, setSent);
    setSent(false);
  };

  // In case user is already logged in redirect him to homepage
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
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="logo"
              className="z-10 max-w-full rounded-full "
            />
          </div>
          <h1 className="text-3xl font-mono font-bold uppercase text-white tracking-widest">
            Walidbook
          </h1>
        </div>
      </div>
      {/* If user successfully logged, redirect to homepage. 
       Otherwise display loader until a response is received*/}
      {sent ? (
        response.success ? (
          <Navigate to={"/"} />
        ) : (
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Loader isChild={true} />
          </div>
        )
      ) : (
        <div className="w-1/2 p-[5%] lg:p-28 flex flex-col items-center justify-center">
          <h1 className="self-start w-[100px] mb-20 pb-3 text-3xl font-semibold text-slate-300 border-b-[3px] border-slate-400 ">
            Login
          </h1>
          <form
            method="post"
            className="w-full flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group flex flex-col gap-3">
              <label htmlFor="email" className="text-[#0076FC] font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email.",
                  },
                })}
              />
              {errors.email ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.email.message}
                </p>
              ) : (
                ""
              )}
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
                {...register("password", {
                  required: "Password is required.",
                })}
              />
              {errors.password ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.password.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-5">
              <input
                type="submit"
                value="Login"
                className="self-start bg-[#0077FF] px-10 py-2 text-sm font-medium text-white cursor-pointer rounded-2xl hover:bg-[#115fb8] transition-all"
              />
              <button
                onClick={loginAsVisitor}
                className="self-start bg-slate-300 px-10 py-2 text-sm font-medium text-black cursor-pointer rounded-2xl hover:bg-slate-500 transition-all"
              >
                Login as visitor
              </button>
            </div>
            {response.message ? (
              <p className="text-sm text-red-500 font-medium">
                Invalid credentials.
              </p>
            ) : (
              ""
            )}
            <p className="text-slate-50">
              Don't have an account ?{" "}
              <Link to={"/signup"} className="text-[#0077FF] font-medium">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
