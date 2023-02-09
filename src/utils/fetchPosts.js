import axios from "axios";
import apiUrl from "./apiUrl";

const fetchPosts = async (user) => {
  try {
    if (!user._id) {
      return [];
    }
    const response = await axios.get(apiUrl + "posts/" + user._id, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    const posts = await response.data;
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPosts;
