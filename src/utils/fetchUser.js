import axios from "axios";

const fetchUser = async (setUser, setLoaded) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoaded(true);
      return;
    }

    const url = process.env.URL || "http://localhost:5000";
    const response = await axios.get(url + "/user", {
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
