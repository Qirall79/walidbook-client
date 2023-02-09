import axios from "axios";
import apiUrl from "./apiUrl";

const deleteFriend = async (userId, friendId) => {
  try {
    const response = await axios.delete(apiUrl + `user/${userId}/${friendId}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default deleteFriend;
