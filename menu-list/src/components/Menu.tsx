import MenuItem from "./MenuItem";
import { MenuItemType } from "../types";

const Menu = (props: { records?: MenuItemType[] }) => {
  const { records } = props;

  return (
    <ul>
      {records?.map((item) => (
        <MenuItem record={item} />
      ))}
    </ul>
  );
};

export default Menu;
