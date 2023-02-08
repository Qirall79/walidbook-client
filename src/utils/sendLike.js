import axios from "axios";

const sendLike = async (postId, author) => {
  try {
    await axios.put(
      `http://localhost:5000/posts/${postId}/likes`,
      {
        author,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    return;
  } catch (err) {
    console.log(err);
  }
};

export default sendLike;
