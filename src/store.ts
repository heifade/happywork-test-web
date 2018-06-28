import { createStore, Action, combineReducers, applyMiddleware, Reducer } from "redux";
import thunkMiddleware from "redux-thunk"; // 允许我们 dispatch() 函数
// import { userManageReducer } from "./userManage/userManageReducer";
import { userListReducer } from "./userManage/userList/userListReducer";
import { userEditReducer } from "./userManage/userEdit/userEditReducer";
import { baseListReducer } from "./baseManage/baseList/baseListReducer";
import { baseEditReducer } from "./baseManage/baseEdit/baseEditReducer";
import { createLogger } from "redux-logger";
import { StoreModuleKey } from "./module";

// export default function reducer(state = new StoreModule(), action: Action) {
//   return {
//     userManage: userManageReducer(state.userManage, action),
//     top: topReducer(state.top, action)
//   };
// }

const loggerMiddleware = createLogger();

let reducer = combineReducers({
  [StoreModuleKey.userList]: userListReducer,
  [StoreModuleKey.userEdit]: userEditReducer,
  [StoreModuleKey.baseList]: baseListReducer,
  [StoreModuleKey.baseEdit]: baseEditReducer,
});

export let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
);

store.subscribe(() => {
  // console.log(1, store.getState());
});