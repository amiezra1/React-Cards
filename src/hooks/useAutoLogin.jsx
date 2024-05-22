import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";

const useAutoLogin = () => {
  const { setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setFinishAutoLogin(true);
      return;
    }
    let userData = jwtDecode(token);
    if (!userData || !userData._id) {
      setFinishAutoLogin(true);
      return;
    }
    axios
      .get("/users/" + userData._id)
      .then(({ data }) => {
        setLogin(userData);
        setFinishAutoLogin(true);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, [setLogin]);

  return finishAutoLogin;
};

export default useAutoLogin;
