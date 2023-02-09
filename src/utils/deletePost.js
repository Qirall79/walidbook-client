import axios from "axios";
import apiUrl from "./apiUrl";

const deletePost = async (postId) => {
  try {
    await axios.delete(apiUrl + "posts/" + postId, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
