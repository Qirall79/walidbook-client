import axios from "axios";

const sendComment = async (body, userId, postId) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/posts/${postId}/comments`,
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
