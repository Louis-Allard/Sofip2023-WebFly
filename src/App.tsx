import Login from "./Components/Login/Login";
import Message from "./Components/Message/Message";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./actions/actions";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        if (response.data.Error) {
          console.log("dzdza");
          dispatch(setAuth(false));
        }
        if (response.data.Status) {
          console.log(response);
          dispatch(setAuth(true));
        }
      } catch (error) {
        dispatch(setAuth(false));
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      <p>TEST</p>
      {isAuth ? <Message /> : <Login />}
    </>
  );
}

export default App;
