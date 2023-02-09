import axios from "axios";
import apiUrl from "./apiUrl";

const sendFriendRequest = async (senderId, receiverId) => {
  try {
    const response = await axios.post(
      `${apiUrl}user/${receiverId}`,
      { user: senderId },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default sendFriendRequest;
