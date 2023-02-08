import axios from "axios";

const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(
      `http://localhost:5000/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

export default deleteComment;
