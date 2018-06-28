import { createStore, Action, combineReducers, applyMiddleware, Reducer } from "redux";
import thunkMiddleware from "redux-thunk"; // 允许我们 dispatch() 函数
// import { userManageReducer } from "./userManage/userManageReducer";
import { userListReducer } from "./userPage/list/listReducer";
import { userEditReducer } from "./userPage/edit/editReducer";
import { createLogger } from "redux-logger";

// export default function reducer(state = new StoreModule(), action: Action) {
//   return {
//     userManage: userManageReducer(state.userManage, action),
//     top: topReducer(state.top, action)
//   };
// }

const loggerMiddleware = createLogger();

let reducer = combineReducers({
  [userListReducer.TypePrefix]: userListReducer.reducer.bind(userListReducer),
  [userEditReducer.TypePrefix]: userEditReducer.reducer.bind(userEditReducer)
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
