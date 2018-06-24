import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app/app";

let theme = require("./theme/theme.less");

let div = document.createElement("div");
document.body.appendChild(div);
div.className = theme["app-theme"];

ReactDOM.render(<AppComponent />, div);
