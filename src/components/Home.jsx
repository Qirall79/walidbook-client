/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPosts from "../utils/fetchPosts";
import Sidebar from "./Sidebar";
import Post from "./Post";
import Loader from "./Loader";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(user);
      setComments([...fetchedPosts.comments]);
      setPosts([...fetchedPosts.userPosts, ...fetchedPosts.friendPosts]);
      setFetched(true);
    };
    getPosts();
  }, []);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={user} />
      {!fetched ? (
        <Loader isChild={true} />
      ) : (
        <div className="pl-1 flex items-center justify-start">
          <div className="w-[97%] h-[93%] bg-slate-200 rounded-3xl p-5 text-black flex flex-col gap-9 items-center overflow-y-scroll">
            {!posts.length
              ? "No posts, post something or get some friends ya lwa7id."
              : posts.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      user={user}
                      comments={comments.filter(
                        (comment) =>
                          comment.post._id.toString() === post._id.toString()
                      )}
                      post={post}
                    />
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
