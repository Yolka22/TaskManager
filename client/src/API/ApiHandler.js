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
}

export default ApiHandler;
