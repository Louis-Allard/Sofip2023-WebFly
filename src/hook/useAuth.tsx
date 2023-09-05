import axios from "axios";
import { Account } from "../Types/Types";
import { useEffect, useState } from "react";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState(null);
  const [account, setAccount] = useState<Account | null | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);
        setUserData(response.data);

        if (response.data.Error) {
          setAccount(null);
          console.log(response.data);
        }
        if (response.data.Status === "Success") {
          setAccount({ username: response.data.username });
          console.log(response.data);
        } else {
          setAccount(null);
        }
      } catch (error) {
        setUserData(null);
        setAccount(null);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3001/users/logout");
      setAccount(null);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const status =
    account === null
      ? AuthStatus.Guest
      : account === undefined
      ? AuthStatus.Unknown
      : AuthStatus.Authenticated;

  return {
    account,
    status,
    logout,
  };
}
