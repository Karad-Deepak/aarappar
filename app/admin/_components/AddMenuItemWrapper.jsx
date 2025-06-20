import { addMenuItem } from "@/app/lib/actions";
import AddItem from "./AddItem";

export default function AddMenuItemWrapper({ menuItems }) {
  return <AddItem menuItems={menuItems} addMenuItem={addMenuItem} />;
}
