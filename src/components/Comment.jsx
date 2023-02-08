import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import deleteComment from "../utils/deleteComment";
import ConfirmationForm from "./ConfirmationForm";

const Comment = ({ comment, user, setComments, comments }) => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const showConfirmation = () => {
    setShowDeleteForm(true);
  };

  const removeComment = async () => {
    const newComments = comments.filter(
      (com) => com._id.toString() !== comment._id.toString()
    );
    setComments([...newComments]);
    await deleteComment(comment.post.toString(), comment._id.toString());
  };

  return (
    <div className="rounded-lg bg-slate-300 p-2 relative">
      {showDeleteForm ? (
        <ConfirmationForm
          setShowDeleteForm={setShowDeleteForm}
          removeComment={removeComment}
        />
      ) : (
        <div>
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
          {user._id.toString() === comment.author._id.toString() ? (
            <TiDelete
              className="absolute top-2 right-2 cursor-pointer text-xl"
              onClick={showConfirmation}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
