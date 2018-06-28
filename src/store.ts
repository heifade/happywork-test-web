import { createStore, Action, combineReducers, applyMiddleware, Reducer } from "redux";
import thunkMiddleware from "redux-thunk"; // 允许我们 dispatch() 函数
// import { userManageReducer } from "./userManage/userManageReducer";
import { userListReducer } from "./userManage/userList/userListReducer";
import { userEditReducer } from "./userManage/userEdit/userEditReducer";
import { listReducer } from "./pageBase/list/listReducer";
import { editReducer } from "./pageBase/edit/editReducer";
import { userListReducer as userListReducer2 } from "./userPage/list/listReducer";
import { userEditReducer as userEditReducer2 } from "./userPage/edit/editReducer";
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
  [listReducer.TypePrefix]: listReducer.reducer.bind(listReducer),
  [editReducer.TypePrefix]: editReducer.reducer.bind(editReducer),

  [userListReducer2.TypePrefix]: userListReducer2.reducer.bind(userListReducer2),
  [userEditReducer2.TypePrefix]: userEditReducer2.reducer.bind(userEditReducer2)
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
