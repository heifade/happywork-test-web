import * as React from "react";
import { listReducer } from "./list/listReducer";
import { editReducer } from "./edit/editReducer";

let List = listReducer.connect();
let Edit = editReducer.connect();

export function PageBase() {
  return (
    <div>
      <List />
      <Edit />
    </div>
  );
}
