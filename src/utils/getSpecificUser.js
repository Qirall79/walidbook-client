import axios from "axios";
import apiUrl from "./apiUrl";

const getSpecificUser = async (userId) => {
  try {
    const response = await axios.get(apiUrl + "user/" + userId, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};

export default getSpecificUser;
