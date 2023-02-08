import axios from "axios";

const fetchPosts = async (user) => {
  try {
    if (!user._id) {
      return [];
    }
    const response = await axios.get(
      "http://localhost:5000/posts/" + user._id,
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    const posts = await response.data;
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPosts;
