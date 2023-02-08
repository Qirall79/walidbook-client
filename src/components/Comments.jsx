import Comment from "./Comment";

const Comments = ({ comments, user, setComments }) => {
  return (
    <div className="flex flex-col gap-3">
      {!comments.length
        ? "No comments in this post."
        : comments.map((comment) => {
            return (
              <Comment
                user={user}
                setComments={setComments}
                comment={comment}
                comments={comments}
                key={comment._id}
              />
            );
          })}
    </div>
  );
};

export default Comments;
