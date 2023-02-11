import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

const CommentForm = ({ submitComment }) => {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getSubmit = (data) => {
    // Activate loader until data is sent and ready to be displayed
    setSent(true);
    submitComment(data, setSent);
    reset();
  };

  return (
    <div className="w-full p-3 bg-amber-400 rounded-lg">
      {sent ? (
        <Loader isChild={true} />
      ) : (
        <form
          method="post"
          className="flex flex-col items-start gap-3"
          onSubmit={handleSubmit(getSubmit)}
        >
          <input
            {...register("body", {
              required: {
                value: true,
                message: "Comment body is required.",
              },
            })}
            type="text"
            name="body"
            id="body"
            placeholder="Comment..."
            className="rounded-md h-8 px-2 outline-none w-full"
          />
          {/* Display errors if any */}
          <p className="text-sm text-red-700">{errors.body?.message}</p>
          <input
            type="submit"
            value="Add comment"
            className="bg-[#002550] p-2 text-white text-xs font-semibold rounded-md cursor-pointer"
          />
        </form>
      )}
    </div>
  );
};

export default CommentForm;
