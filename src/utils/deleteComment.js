import axios from "axios";
import apiUrl from "./apiUrl";

const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(`${apiUrl}posts/${postId}/comments/${commentId}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default deleteComment;
