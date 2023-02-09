/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import fetchPosts from "../utils/fetchPosts";
import Sidebar from "./Sidebar";
import Post from "./Post";
import Loader from "./Loader";

const CurrentUser = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [fetched, setFetched] = useState(false);

  const getPosts = async () => {
    const posts = await fetchPosts(user);
    setUserPosts([...posts.userPosts]);
    setComments([...posts.comments]);
    setFetched(true);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} path={"/user"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-black flex flex-col gap-9 items-center overflow-auto">
          <div className="w-full p-8 rounded-lg flex flex-col items-center gap-4 text-white bg-[#002550]">
            <img
              src={user.image || "./images/none.webp"}
              alt="profile"
              className="max-w-[200px] rounded-full"
            />
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-3xl my-3 capitalize font-bold">
                {user.firstName + " " + user.lastName}
              </h1>
              <p>{user.email}</p>
              <p className="font-semibold"> Friends {user.friends.length}</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {!fetched ? (
              <Loader isChild={true} />
            ) : !userPosts.length ? (
              "You have no posts yet."
            ) : (
              userPosts.map((post) => {
                return (
                  <Post
                    posts={userPosts}
                    setPosts={setUserPosts}
                    key={post._id}
                    user={user}
                    postComments={comments.filter(
                      (comment) =>
                        comment.post._id.toString() === post._id.toString()
                    )}
                    post={post}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
