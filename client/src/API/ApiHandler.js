import axios from "axios";
import { setUser } from "../redux/actions";

const host = "http://localhost:5163";

class ApiHandler {
  static IsServerOnline() {
    axios
      .get(`${host}/isonline`)
      .then((response) => {
        console.log(`server online/${response.data}`);
      })
      .catch((error) => {
        console.error("Server Offline", error);
      });
  }

  static UserRegister(user) {
    axios
      .post(`${host}/user/register`, user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  static async UserLogin(user, dispatch) {
    try {
      const response = await axios.post(`${host}/user/login`, user);
      console.log(response.data);

      // Assuming your user data is nested under the 'data' property
      // Adjust accordingly based on the actual structure of your API response
      dispatch(setUser(response.data));  // Dispatch the setUser action
    } catch (error) {
      console.error("error", error);
    }
  }
}

export default ApiHandler;
