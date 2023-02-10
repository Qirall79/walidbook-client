import axios from "axios";
import apiUrl from "./apiUrl";

const sendPost = async (data) => {
  try {
    const response = await axios.post(apiUrl + "posts", data, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendPost;
