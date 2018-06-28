import * as React from "react";
import { userListReducer } from "./list/listReducer";
import { UserListComponent } from "./list/list";
import { userEditReducer } from "./edit/editReducer";
import UserEditComponent from "./edit/edit";

let List = userListReducer.connect(UserListComponent);
let Edit = userEditReducer.connect(UserEditComponent);

export function UserPage() {
  return (
    <div>
      <List />
      <Edit />
    </div>
  );
}
