import * as React from "react";
import DataList from "./list/listReducer";
import DataEdit from "./edit/editReducer";

export function PageBase() {
  return (
    <div>
      <DataList />
      <DataEdit />
    </div>
  );
}


