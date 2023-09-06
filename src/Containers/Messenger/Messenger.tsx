import { useState } from "react";
import NavBar from "../../Components/Navbar/Navbar";
import Profil from "../../Components/Profil/Profil";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";

const Message = () => {
  const [activeTab, setActiveTab] = useState("profil");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen flex`}>
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 p-4">
        <div className={`max-w-md mx-auto shadow rounded-lg p-4`}>
          {activeTab === "profil" && (
            <Profil activeTab={activeTab} onTabChange={handleTabChange} />
          )}
          {activeTab === "password" && <ChangePassword id={1} />}
        </div>
      </div>
    </div>
  );
};

export default Message;
