import { useState, useEffect } from "react";
import { MenuItemType } from "./types";
import Menu from "./components/Menu";
import { fetchData } from "./components/clientAPI";
import "./App.css";

function App() {
  const [menuData, setMenuData] = useState<MenuItemType[]>();

  useEffect(() => {
    const getRecords = async () => {
      const record: MenuItemType[] = await fetchData();
      setMenuData(record);
    };

    getRecords();
  }, [menuData]);

  return (
    <div className="menu-container">
      <Menu records={menuData} />
    </div>
  );
}

export default App;
