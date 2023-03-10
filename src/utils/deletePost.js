import axios from "axios";
import apiUrl from "./apiUrl";

const deletePost = async (postId) => {
  try {
    await axios.delete(apiUrl + "posts/" + postId, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
