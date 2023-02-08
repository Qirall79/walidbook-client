const Comment = ({ comment }) => {
  return (
    <div className="rounded-lg bg-slate-300 p-2">
      <div className="flex gap-3 items-center mb-5">
        <img
          className="w-10 rounded-full"
          src={comment.author.image || "./images/none.webp"}
          alt="profile"
        />
        <div>
          <p className="text-sm font-semibold capitalize">
            {comment.author.firstName + " " + comment.author.lastName}
          </p>
          <p className="text-xs font-semibold text-slate-500">
            {comment.timestamp}
          </p>
        </div>
      </div>
      <p className="pl-2 pb-2">{comment.body}</p>
    </div>
  );
};

export default Comment;
