import { useForm } from "react-hook-form";

const CommentForm = ({ submitComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full p-3 bg-amber-400 rounded-lg">
      <form
        method="post"
        className="flex flex-col items-start gap-3"
        onSubmit={handleSubmit(submitComment)}
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
        <p className="text-sm text-red-700">{errors.body?.message}</p>
        <input
          type="submit"
          value="Add comment"
          className="bg-[#002550] p-2 text-white text-xs font-semibold rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CommentForm;
