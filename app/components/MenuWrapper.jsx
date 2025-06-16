// app/components/AddMenuItemWrapper.js

import NewMenu from "./NewMenu";
import { addItems } from "../lib/actions";

export default function AddMenuItemWrapper({ menuItems }) {
  return <NewMenu menuItems={menuItems} addMenuItem={addItems} />;
}
