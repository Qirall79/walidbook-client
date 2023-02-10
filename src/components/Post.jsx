import { useState } from "react";
import sendLike from "../utils/sendLike";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import sendComment from "../utils/sendComment";
import { TiDelete } from "react-icons/ti";
import ConfirmationForm from "./ConfirmationForm";
import deletePost from "../utils/deletePost";
import { Link } from "react-router-dom";

const Post = ({ post, postComments, user, posts, setPosts }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([...postComments]);
  const [confirm, setConfirm] = useState(false);

  const showConfirmation = () => {
    setConfirm(true);
  };

  const displayComments = () => {
    const commentsDiv = document.getElementById("comments-" + post._id);
    const siblingDiv = document.getElementById("sibling-" + post._id);

    // Remove round corners from likes/comments div
    siblingDiv.classList.toggle("rounded-b-2xl");

    // Display comments div
    commentsDiv.classList.toggle("flex");
    commentsDiv.classList.toggle("hidden");
  };

  const toggleLike = () => {
    sendLike(post._id.toString(), user._id.toString());
    const likers = Object.keys(likes);
    if (likers.includes(user._id.toString())) {
      const newLikes = likes;
      delete newLikes[user._id.toString()];
      setLikes({ ...newLikes });
      return;
    } else {
      setLikes({ ...likes, [user._id.toString()]: "true" });
    }
  };

  const submitComment = async ({ body }) => {
    const { comment, author } = await sendComment(
      body,
      user._id.toString(),
      post._id.toString()
    );
    const newComment = { ...comment, author };
    setComments([...comments, newComment]);
  };

  const removePost = async () => {
    const newPosts = posts.filter(
      (p) => p._id.toString() !== post._id.toString()
    );
    setPosts(newPosts);
    await deletePost(post._id.toString());
  };

  return (
    <div className="text-black w-[400px]  bg-slate-400 flex flex-col gap-7 rounded-2xl">
      {confirm ? (
        <div className="p-5">
          <ConfirmationForm
            setShowDeleteForm={setConfirm}
            remove={removePost}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-7 relative">
          <div className="flex gap-2 items-center px-5 pt-5">
            <img
              src={
                post.author.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="profile"
              className="w-12 rounded-full"
            />
            <div>
              <Link
                className="capitalize font-bold text-sm mb-1"
                to={"/user/" + post.author._id}
              >
                {post.author.firstName + " " + post.author.lastName}
              </Link>
              <p className="text-xs text-slate-700">{post.timestamp}</p>
            </div>
          </div>
          <div className="px-5">
            <p className="mb-4">{post.description}</p>
            {post.image ? (
              <img src={post.image} alt="post" className="w-full" />
            ) : (
              ""
            )}
          </div>
          <div>
            <div
              className="py-3 px-5 rounded-b-2xl flex gap-5 bg-slate-50"
              id={"sibling-" + post._id}
            >
              <p
                className="cursor-pointer flex gap-1 items-center text-lg"
                onClick={toggleLike}
              >
                {Object.keys(likes).includes(user._id.toString()) ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike />
                )}
                <span className="text-sm">{Object.keys(likes).length}</span>
              </p>
              <p
                className="cursor-pointer flex items-center text-xl"
                onClick={displayComments}
              >
                <AiOutlineComment />
              </p>
            </div>
            <div
              className="p-5 flex-col gap-3 hidden   bg-slate-300"
              id={"comments-" + post._id}
            >
              <Comments
                setComments={setComments}
                comments={comments}
                post={post}
                user={user}
              />
              <CommentForm submitComment={submitComment} />
            </div>
          </div>
          {user._id.toString() === post.author._id.toString() ? (
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

export default Post;
