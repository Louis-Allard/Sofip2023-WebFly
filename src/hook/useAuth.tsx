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

  const [account, setAccount] = useState<Account | null | undefined>(undefined);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);
        if (response.data.Error) {
          setAccount(null);
        }
        if (response.data.Status === "Success") {
          console.log(response.data);
          setAccount({
            id: response.data.id,
            username: response.data.username,
            avatar: response.data.avatar,
            role: response.data.role,
          });
        } else {
          setAccount(null);
        }
      } catch (error) {
        setAccount(null);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3001/users/logout");
      setAccount(null);
      location.reload();
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
