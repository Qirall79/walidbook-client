import { useState } from "react";
import { useForm } from "react-hook-form";
import resizeImage from "../utils/resizeImage";
import sendPost from "../utils/sendPost";
import Loader from "./Loader";

const PostForm = ({ getPosts, posts, user }) => {
  const [isSubmitted, setSubmitted] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("author", user._id.toString());
    const img = document.querySelector("input[type='file']");
    const imageFile = img.files[0];

    if (imageFile) {
      // Resize image to increase performance
      const resizedImg = await resizeImage(imageFile);
      const image = await urlToFile(resizedImg, "picture.png", "image/png");

      if (img.value) {
        formData.append("image", image);
      }
    }
    setSubmitted(false);
    await sendPost(formData);
    await getPosts();
    reset();
    setSubmitted(true);
  };
  return (
    <div className="w-[400px] bg-slate-400 p-5 rounded-2xl ">
      {!isSubmitted ? (
        <Loader isChild={true} />
      ) : (
        <form
          method="post"
          className="w-full flex flex-col gap-4 items-start justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("description", {
              required: {
                value: true,
                message: "Type something first",
              },
            })}
            className="w-full h-15 rounded-lg p-2 outline-none resize-none"
            name="description"
            id="description"
            placeholder="Anything new ?"
          ></textarea>
          <p className="text-sm text-red-500 font-medium">
            {errors.description?.message}
          </p>
          <div className="w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Add image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>

          <input
            type="submit"
            value="Post"
            className="bg-[#002550] py-2 px-7 text-white text-sm font-semibold rounded-md cursor-pointer"
          />
        </form>
      )}
    </div>
  );
};

export default PostForm;
