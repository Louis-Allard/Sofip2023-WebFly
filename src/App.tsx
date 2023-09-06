import Login from "./Components/Login/Login";
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
        <Message />
      </>
    );
  }
}

export default App;
