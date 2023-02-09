import axios from "axios";
import apiUrl from "./apiUrl";

const sendComment = async (body, userId, postId) => {
  try {
    const response = await axios.post(
      `${apiUrl}posts/${postId}/comments`,
      {
        body,
        author: userId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    return { comment: response.data.comment, author: response.data.author };
  } catch (err) {
    console.log(err);
  }
};

export default sendComment;
