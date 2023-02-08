import { DateTime } from "luxon";

const Post = ({ post }) => {
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
      <div className="p-5 rounded-b-2xl flex gap-3 bg-slate-50">
        <p>Like</p>
        <p>Comment</p>
      </div>
    </div>
  );
};

export default Post;
