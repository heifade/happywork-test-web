import * as React from "react";
import DataList from "./baseList/baseListReducer";
import DataEdit from "./baseEdit/baseEditReducer";

export function BaseManage() {
  return (
    <div>
      <DataList />
      <DataEdit />
    </div>
  );
}


