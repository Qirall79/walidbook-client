import { useState } from "react";
import sendLike from "../utils/sendLike";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import Comments from "./Comments";

const Post = ({ post, comments, user }) => {
  const [likes, setLikes] = useState(post.likes);

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

  return (
    <div className="text-black w-[400px]  bg-slate-400 flex flex-col gap-7 rounded-2xl">
      <div className="flex gap-2 items-center px-5 pt-5">
        <img
          src={post.author.image || "./images/none.webp"}
          alt="profile"
          className="w-12 rounded-full"
        />
        <div>
          <p className="capitalize font-bold text-sm mb-1">
            {post.author.firstName + " " + post.author.lastName}
          </p>
          <p className="text-xs text-slate-700">{post.timestamp}</p>
        </div>
      </div>
      <div className="px-5">
        <p className="mb-4">{post.description}</p>
        <img
          src={post.image || "./images/none.webp"}
          alt="post"
          className="w-full"
        />
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
            <p className="text-sm">{Object.keys(likes).length}</p>
          </p>
          <p
            className="cursor-pointer flex items-center text-xl"
            onClick={displayComments}
          >
            <AiOutlineComment />
          </p>
        </div>
        <div className="p-5 flex-col gap-3 hidden" id={"comments-" + post._id}>
          <Comments comments={comments} post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
