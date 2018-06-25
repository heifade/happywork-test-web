import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app/app";

const styles = require("./theme/theme.less");


let div = document.createElement("div");
document.body.appendChild(div);
div.className = styles["app-theme"];

ReactDOM.render(<AppComponent />, div);
