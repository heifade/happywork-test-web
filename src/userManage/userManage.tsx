import * as React from "react";
import UserList from "./userList/userListReducer";
import UserEdit from "./userEdit/userEditReducer";

export function UserManage() {
  return (
    <div>
      <UserList />
      <UserEdit />
    </div>
  );
}


