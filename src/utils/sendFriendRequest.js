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
  } catch (err) {
    console.log(err);
  }
};

export default sendFriendRequest;
