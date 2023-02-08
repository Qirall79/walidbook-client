import Comment from "./Comment";

const Comments = ({ comments, post }) => {
  return (
    <div className="flex flex-col gap-3">
      {!comments.length
        ? "No comments in this post."
        : comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
    </div>
  );
};

export default Comments;
