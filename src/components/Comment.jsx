import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import deleteComment from "../utils/deleteComment";
import ConfirmationForm from "./ConfirmationForm";

const Comment = ({ comment, user, setComments, comments }) => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  // Display delete confirmation form
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
    <div className="rounded-lg bg-slate-400 p-2 relative">
      {showDeleteForm ? (
        <ConfirmationForm
          setShowDeleteForm={setShowDeleteForm}
          remove={removeComment}
        />
      ) : (
        <div>
          <div className="flex gap-3 items-center mb-5">
            <img
              className="w-10 h-10 rounded-full"
              src={
                comment.author.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="profile"
            />
            <div>
              <Link
                to={"/user/" + comment.author._id}
                className="text-sm font-semibold capitalize"
              >
                {comment.author.firstName + " " + comment.author.lastName}
              </Link>
              <p className="text-xs font-semibold text-slate-500">
                {comment.timestamp}
              </p>
            </div>
          </div>
          <p className="pl-2 pb-2">{comment.body}</p>

          {/* Allow user to delete comment if he's the one who wrote it */}
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
