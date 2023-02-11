import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "./Loader";
import updateUser from "../utils/updateUser";
import resizeImage from "../utils/resizeImage";

const Settings = ({ user, setUser }) => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
  });

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

  // Submit update form
  const submitForm = async (data) => {
    if (data.new_password !== data.password_confirmation) {
      const p = document.getElementById("pw-error");
      p.innerText = "Passwords don't match.";
      return;
    }
    if (data.new_password.length > 0 && data.new_password.length < 8) {
      const p = document.getElementById("pw-error");
      p.innerText = "Password must be at least 8 characters long.";
      return;
    }
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key]);
    });
    const img = document.querySelector("input[type='file'");
    const imageFile = img.files[0];

    // Resize image for performance sake
    if (imageFile) {
      const resizedImg = await resizeImage(imageFile);
      const image = await urlToFile(resizedImg, "picture.png", "image/png");

      if (img.value) {
        formData.append("image", image);
      }
    }
    formData.append("user", user._id);

    setIsSaving(true);
    const newUser = await updateUser(formData, user);
    setUser(newUser);
    setIsSaving(false);
  };

  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/settings"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-white flex flex-col gap-9 items-center">
          {/* Display loader while sending form */}
          {isSaving ? (
            <Loader isChild={true} />
          ) : (
            <div className="w-full">
              <form
                method="post"
                onSubmit={handleSubmit(submitForm)}
                encType="multipart/form-data"
                className="w-full max-w-[500px] p-8 flex flex-col gap-8"
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
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email",
                      },
                    })}
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
                    htmlFor="new_password"
                    className="text-[#0076FC] text-sm font-medium"
                  >
                    New Password
                  </label>
                  <input
                    {...register("new_password")}
                    type="password"
                    name="new_password"
                    id="new_password"
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
                    {...register("password_confirmation")}
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    className="bg-transparent border-b-[1px] border-slate-400 outline-none text-slate-50 text-sm pl-1 pb-1"
                  />

                  <p
                    className="text-sm text-red-500 font-medium"
                    id="pw-error"
                  ></p>
                </div>
                <div className="form-group flex flex-col gap-2">
                  <label
                    htmlFor="image"
                    className="text-[#0076FC] text-sm font-medium"
                  >
                    New Profile Picture
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
                  value="Save"
                  className="self-start bg-[#0077FF] mt-3 px-10 py-2 text-sm font-medium text-white cursor-pointer rounded-2xl hover:bg-[#115fb8] transition-all"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
