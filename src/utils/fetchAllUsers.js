import axios from "axios";
import apiUrl from "./apiUrl";

const fetchAllUsers = async (user) => {
  try {
    const response = await axios.get(apiUrl + "users", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    const userFriends = user.friends.map((friend) => friend._id.toString());
    let users = response.data.users.filter(
      (u) =>
        !userFriends.includes(u._id.toString()) &&
        u._id.toString() !== user._id.toString()
    );
    return users;
  } catch (err) {
    console.log(err);
  }
};

export default fetchAllUsers;
