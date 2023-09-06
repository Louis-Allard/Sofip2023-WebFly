import axios from "axios";
import TabItem from "../Tabitem/TabItem";
import { useState } from "react";
import { AuthStatus, useAuth } from "../../hook/useAuth";

const NavBar = ({ activeTab, onTabChange }) => {
  const [ticketsData, setTicketsData] = useState({});
  const { account } = useAuth();

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/tickets/user/${account.id}`
      );
      setTicketsData(response.data);
      console.log(response.data);
    } catch (error) {
      setTicketsData("test");
    }
  };
  return (
    <nav className="h-screen p-4">
      <ul>
        <TabItem
          label="Infos personnel"
          isActive={activeTab === "profil"}
          onClick={() => onTabChange("profil")}
        />
        <TabItem
          label="user 1"
          isActive={activeTab === "1"}
          onClick={() => onTabChange("1")}
        />

        <TabItem
          label="user 2"
          isActive={activeTab === "2"}
          onClick={() => onTabChange("2")}
        />
      </ul>
    </nav>
  );
};

export default NavBar;
