import axios from "axios";
import apiUrl from "./apiUrl";
import fetchUser from "./fetchUser";

const loginUser = async (formData, setResponse, setSent, setUser) => {
  try {
    const response = await axios.post(apiUrl + "auth/login", formData);
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);
    await fetchUser(setUser, setSent);
    setResponse({ success: true });

    console.log(response);
  } catch (err) {
    setResponse({ success: false, message: err.response.data.message });
    setSent(false);
  }
};

export default loginUser;
