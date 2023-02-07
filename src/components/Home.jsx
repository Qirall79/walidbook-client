import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPosts from "../utils/fetchPosts";

const Home = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(user);
      setComments(fetchedPosts.comments);
      setPosts([...fetchedPosts.userPosts, ...fetchedPosts.friendPosts]);
    };
    getPosts();
  }, []);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] ">
      {!posts.length
        ? "No posts, post something or get some friends ya lwa7id."
        : posts.map((post) => {
            return (
              <div>
                {post.author +
                  ", " +
                  post.description +
                  ", " +
                  post.timestamp_formatted}
              </div>
            );
          })}
    </div>
  );
};

export default Home;
