import axios from "axios";
import apiUrl from "./apiUrl";

const fetchUser = async (setUser, setLoaded) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoaded(true);
      return;
    }

    const response = await axios.get(apiUrl + "user", {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
    });
    setUser(response.data.user);
  } catch (err) {
    console.log(err);
  }
  setLoaded(true);
};

export default fetchUser;
