import axios from "axios";
import apiUrl from "./apiUrl";
import fetchUser from "./fetchUser";

const signupUser = async (formData, setResponse, setSent, setUser) => {
  setSent(true);
  try {
    const response = await axios.post(apiUrl + "auth/signup", formData);
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);
    await fetchUser(setUser, setSent);
    setResponse({ success: true });
    console.log(response);
  } catch (err) {
    console.log(err);
    setSent(false);
    setResponse({
      success: false,
      errors: err.response.data.errors,
      user: err.response.data.user,
    });
  }
};

export default signupUser;
