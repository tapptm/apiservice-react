import axios from "axios";
const LOCAL_API_URL = "http://localhost:4000/api/auth/";
const API_URL = "https://kmapi.kims-rmuti.com/api/auth/";

class AuthService {
  login(username, password) {
    const timeExpire = new Date(
      new Date().getTime() + 60 * 60000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem(
            "token",
            JSON.stringify({
              token: response.data.accessToken,
              expire: timeExpire,
            })
          );
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, password, email, first_name, last_name, agency) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      first_name,
      last_name,
      agency,
    });
  }

  refreshToken(username, refreshToken) {
    return axios.get(
      API_URL + `token?username=${username}&refreshToken=${refreshToken}`
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
