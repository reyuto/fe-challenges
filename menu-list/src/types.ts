export type MenuItemType = {
  id: string;
  name: string;
  children?: MenuItemType[];
};
