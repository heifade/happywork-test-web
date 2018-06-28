import * as React from "react";
import { ListComponent } from "./list/list";
import EditComponent from "./edit/edit";
import { listReducer } from "./list/listReducer";
import { editReducer } from "./edit/editReducer";

let List = listReducer.connect(ListComponent);
let Edit = editReducer.connect(EditComponent);

export function PageBase() {
  return (
    <div>
      <List />
      <Edit />
    </div>
  );
}
