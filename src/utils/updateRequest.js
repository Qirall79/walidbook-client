import axios from "axios";
import apiUrl from "./apiUrl";

const updateRequest = async (action, senderId, receiverId) => {
  try {
    const response = await axios.put(
      `${apiUrl}user/${senderId}`,
      { user: receiverId, action },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export default updateRequest;
