/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import getSpecificUser from "../utils/getSpecificUser";
import fetchPosts from "../utils/fetchPosts";
import Sidebar from "./Sidebar";
import Post from "./Post";
import Loader from "./Loader";
import deleteFriend from "../utils/deleteFriend";
import sendFriendRequest from "../utils/sendFriendRequest";
import updateRequest from "../utils/updateRequest";

const User = ({ currentUser, setCurrentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [fetched, setFetched] = useState(false);

  // Delete friend
  const removeFriend = async () => {
    // Update lists in the frontend for UI purposes
    const newCurrentUserFriends = currentUser.friends.filter(
      (friend) => friend._id.toString() !== user._id.toString()
    );
    const newUserFriends = user.friends.filter(
      (friend) => friend._id.toString() !== currentUser._id.toString()
    );
    setCurrentUser({ ...currentUser, friends: [...newCurrentUserFriends] });
    setUser({ ...user, friends: [...newUserFriends] });

    // Update in server
    await deleteFriend(currentUser._id, user._id);
  };

  const addFriend = async () => {
    // Update in the client
    const newCurrentUserSentRequests = [
      ...currentUser.sentRequests,
      { _id: user._id },
    ];
    const newUserReceivedRequests = [
      ...user.receivedRequests,
      { _id: currentUser._id },
    ];

    setCurrentUser({
      ...currentUser,
      sentRequests: [...newCurrentUserSentRequests],
    });
    setUser({ ...user, receivedRequests: [...newUserReceivedRequests] });

    // Update in server
    await sendFriendRequest(currentUser._id, user._id);
  };

  const answerRequest = async (e) => {
    const action =
      e.target.innerText.toLowerCase() === "accept" ? "accept" : "cancel";
    const newCurrentUserSentRequests = currentUser.sentRequests.filter(
      (req) => req._id.toString() !== user._id.toString()
    );
    const newUserReceivedRequests = user.receivedRequests.filter(
      (req) => req._id.toString() === currentUser._id.toString()
    );
    const newCurrentUserReceivedRequests = currentUser.receivedRequests.filter(
      (req) => req._id.toString() !== user._id.toString()
    );
    const newUserSentRequests = user.sentRequests.filter(
      (req) => req._id.toString() === currentUser._id.toString()
    );
    setCurrentUser({
      ...currentUser,
      sentRequests: [...newCurrentUserSentRequests],
      receivedRequests: [...newCurrentUserReceivedRequests],
    });
    setUser({
      ...user,
      receivedRequests: [...newUserReceivedRequests],
      sentRequests: [...newUserSentRequests],
    });

    if (action === "accept") {
      // Update lists in the frontend for UI purposes
      const newCurrentUserFriends = [...currentUser.friends, { _id: user._id }];
      const newUserFriends = [...user.friends, { _id: currentUser._id }];
      setCurrentUser({ ...currentUser, friends: [...newCurrentUserFriends] });
      setUser({ ...user, friends: [...newUserFriends] });
    }
    await updateRequest(action, currentUser._id, user._id);
  };

  const getPosts = async () => {
    const fetchedUser = await getSpecificUser(userId);
    setUser({ ...fetchedUser });
    const posts = await fetchPosts(fetchedUser);
    setUserPosts([...posts.userPosts]);
    setComments([...posts.comments]);
    setFetched(true);
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (userId.toString() === currentUser._id.toString()) {
    return <Navigate to={"/user"} />;
  }

  return (
    <div className="w-[1300px] h-[800px] bg-[#002550] grid grid-cols-[1fr_4fr] grid-rows-1 text-white rounded-3xl">
      <Sidebar user={currentUser} path={"/find"} />
      <div className="pl-1 flex items-center justify-start">
        <div className="w-[97%] h-[93%] bg-slate-900 rounded-3xl p-5 text-black flex flex-col gap-9 items-center overflow-y-scroll">
          {!fetched ? (
            <Loader isChild={true} />
          ) : !userPosts.length ? (
            "You have no posts yet."
          ) : (
            <div className="w-full flex flex-col items-center gap-8">
              <div className="w-full p-8 rounded-lg flex flex-col items-center text-white gap-4 bg-[#002550]">
                <img
                  src={user.image || "../images/none.webp"}
                  alt="profile"
                  className="max-w-[200px] rounded-full"
                />
                <div className="flex flex-col items-center gap-3">
                  <h1 className="text-3xl my-3 capitalize font-bold">
                    {user.firstName + " " + user.lastName}
                  </h1>
                  <p>{user.email}</p>
                  <p className="font-semibold mb-5">
                    {" "}
                    Friends {user.friends.length}
                  </p>
                  <div>
                    {currentUser.friends.filter(
                      (friend) => friend._id.toString() === user._id.toString()
                    ).length ? (
                      <button
                        className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg"
                        onClick={removeFriend}
                      >
                        Remove friend
                      </button>
                    ) : currentUser.sentRequests.filter(
                        (req) => req._id.toString() === user._id.toString()
                      ).length ? (
                      <button
                        className="px-6 py-2 bg-teal-400 text-black font-semibold rounded-lg"
                        onClick={answerRequest}
                      >
                        Remove friend request
                      </button>
                    ) : currentUser.receivedRequests.filter(
                        (req) => req._id.toString() === user._id.toString()
                      ).length ? (
                      <div className="flex gap-5">
                        <button
                          className="px-6 py-2 bg-teal-400 text-black font-semibold rounded-lg"
                          onClick={answerRequest}
                        >
                          Accept
                        </button>
                        <button
                          className="px-6 py-2 bg-[#94A3B8] text-black font-semibold rounded-lg"
                          onClick={answerRequest}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <button
                        className="px-6 py-2 bg-[#94A3B8] text-black font-semibold rounded-lg"
                        onClick={addFriend}
                      >
                        Add friend
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {userPosts.map((post) => {
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
