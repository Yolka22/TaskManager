import axios from "axios";

const host = "http://localhost:5163";


class ApiHandler {
  static IsServerOnline() {
    axios
      .get(`${host}/isonline`)
      .then((response) => {
        console.log(`server online/${response.data}`);
      })
      .catch((error) => {
        console.error("Server Ofline", error);
      });
  }


  static UserRegister(user){
    axios
      .post(`${host}/user/register`,user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  static UserLogin(user){
    axios
      .post(`${host}/user/login`,user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
}

export default ApiHandler;
