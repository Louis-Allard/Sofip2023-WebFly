/*  const { isAuth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    dispatch(setAuth(false)); */

import Login from "./Components/Login/Login";

import Messenger from "./Components/Messenger/Messenger";

import Message from "./Containers/Messenger/Messenger";

import "./App.css";
import { AuthStatus, useAuth } from "./hook/useAuth";

function App() {

  const { status } = useAuth();

  if (status === AuthStatus.Unknown) {
    return;
  }
  if (status === AuthStatus.Guest) {
    return <Login />;
  }
  if (status === AuthStatus.Authenticated) {
    return (
      <>
         <Messenger />
      </>
    );
  }
}

export default App;
