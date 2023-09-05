/*  const { isAuth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    dispatch(setAuth(false)); */

import Login from "./Components/Login/Login";
import Message from "./Components/Message/Message";
import "./App.css";
import { AuthStatus, useAuth } from "./hook/useAuth";

function App() {
  const { status } = useAuth();

  if (status === AuthStatus.Unknown) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
  if (status === AuthStatus.Guest) {
    return (
      <>
        <Login />
      </>
    );
  }
  if (status === AuthStatus.Authenticated) {
    return (
      <>
        <Message />
      </>
    );
  }
}

export default App;
