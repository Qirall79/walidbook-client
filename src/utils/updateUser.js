import axios from "axios";
import apiUrl from "./apiUrl";

const updateUser = async (data, user) => {
  try {
    const response = await axios.post(apiUrl + "auth/update", data, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return user;
  }
};

export default updateUser;
