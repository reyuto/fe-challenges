import { useState } from "react";
import { MenuItemType } from "../types";
import Menu from "./Menu";

const MenuItem = (props: { record: MenuItemType }) => {
  const [subListOpen, setSubListOpen] = useState<boolean>(true);
  const { record } = props;
  return (
    <li
      className={
        record.children?.length
          ? `menu-list ${subListOpen ? "open" : "closed"}`
          : "menu-item"
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSubListOpen(!subListOpen);
      }}
    >
      <label>{record.name}</label>
      {subListOpen && record.children?.length ? (
        <Menu records={record.children} />
      ) : null}
    </li>
  );
};

export default MenuItem;
