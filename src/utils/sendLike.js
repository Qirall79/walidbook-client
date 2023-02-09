import axios from "axios";
import apiUrl from "./apiUrl";

const sendLike = async (postId, author) => {
  try {
    await axios.put(
      `${apiUrl}posts/${postId}/likes`,
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
