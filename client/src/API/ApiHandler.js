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

  static async UserLogin(user, dispatch, navigate) {
    try {
      const response = await axios.post(`${host}/user/login`, user);

      // Assuming your user data is nested under the 'data' property
      // Adjust accordingly based on the actual structure of your API response
      await dispatch(setUser(response.data)); // Dispatch the setUser action

      if (response.data !== null) {
        navigate("/home"); // Use React Router's navigate function
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  static async UserRefresh(userId, dispatch) {
    try {
      const response = await axios.post(`${host}/user/refresh`, { userId });

      if (response.status !== 200) {
        throw new Error(`Error refreshing user: ${response.statusText}`);
      }

      const data = response.data;
      await dispatch(setUser(data));

      return response;
    } catch (error) {
      console.error(`Error in UserRefresh: ${error.message}`);
      throw error;
    }
  }

  static async TaskAdd(taskData) {
    try {
      const response = await axios.post(`${host}/task`, taskData);
    } catch (error) {
      console.error("Error adding task", error);
      throw error; // rethrow the error to handle it in the component
    }
  }

  static async TaskDelete(taskId) {
    try {
      await axios.delete(`${host}/task/${taskId}`);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task", error);
      // Handle the error in your application
    }
  }

  static async addSubTask({ TaskId, title }) {
    try {
        console.log({ TaskId, title });
        const response = await axios.post(`${host}/subtask`, { TaskId, title });
        console.log(response.data);
    } catch (error) {
        console.error("Error adding sub task", error);
    }
}

}

export default ApiHandler;
