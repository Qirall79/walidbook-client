import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import signupUser from "../utils/signupUser";
import Loader from "./Loader";
import resizeImage from "../utils/resizeImage";

const Signup = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isMatch, setMatch] = useState(true);
  const [response, setResponse] = useState({ success: false });
  const [sent, setSent] = useState(false);

  // Convert image from base64 to file after resize
  const urlToFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      setMatch(false);
      return;
    }

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key]);
    });
    const img = document.querySelector("input[type='file'");
    const imageFile = img.files[0];

    if (imageFile) {
      // Resize image to increase performance
      const resizedImg = await resizeImage(imageFile);
      const image = await urlToFile(resizedImg, "picture.png", "image/png");

      if (img.value) {
        formData.append("image", image);
      }
    }

    setMatch(true);
    await signupUser(formData, setResponse, setSent, setUser);
  };

  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="w-[90%] h-[90%] min-h-fit max-w-[1450px] bg-[#002550] flex shadow-2xl rounded-xl">
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
      {sent ? (
        response.success ? (
          <Navigate to={"/"} />
        ) : (
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Loader isChild={true} />
          </div>
        )
      ) : (
        <div
          className={
            "w-1/2 p-[5%] lg:px-28 lg:py-10 flex flex-col items-center justify-center "
          }
        >
          <h1 className="self-start w-[120px] mb-10 pb-3 text-3xl font-semibold text-slate-300 border-b-[3px] border-slate-400 ">
            Sign Up
          </h1>
          <form
            method="post"
            className="w-full max-h-full flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="first_name"
                className="text-[#0076FC] text-sm font-medium"
              >
                First Name
              </label>
              <input
                {...register("first_name", {
                  required: "First name is required.",
                })}
                type="text"
                name="first_name"
                id="first_name"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
              />
              {errors.first_name ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.first_name.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="last_name"
                className="text-[#0076FC] text-sm font-medium"
              >
                Last Name
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required.",
                })}
                type="text"
                name="last_name"
                id="last_name"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
              />
              {errors.last_name ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.last_name.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[#0076FC] text-sm font-medium"
              >
                Email
              </label>
              <input
                {...register("email", { required: "Email is required." })}
                type="text"
                name="email"
                id="email"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
              />
              {errors.email ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.email.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#0076FC] text-sm font-medium"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters.",
                  },
                })}
                type="password"
                name="password"
                id="password"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
              />
              {errors.password ? (
                <p className="text-sm text-red-500 font-medium">
                  {errors.password.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="password_confirmation"
                className="text-[#0076FC] text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                {...register("password_confirmation", {
                  required: "Password confirmation is required.",
                })}
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
              />
              {!isMatch ? (
                <p className="text-sm text-red-500 font-medium">
                  Passwords don't match.
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="image"
                className="text-[#0076FC] text-sm font-medium"
              >
                Profile Picture
              </label>
              <input
                {...register("image")}
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
            {response.errors
              ? response.errors.map((err, index) => (
                  <p className="text-sm text-red-500 font-medium" key={index}>
                    {err.msg}
                  </p>
                ))
              : ""}
            <p className="text-slate-50">
              Already have an account ?{" "}
              <Link to={"/login"} className="text-[#0077FF] font-medium">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
