import { connect } from "react-redux";
import { AnyAction, Dispatch, Reducer } from "redux";
import { UserListComponent, Props } from "./userList";
import { UserModule, UserListManageModule } from "./userListModule";
import { StoreModuleKey } from "../../module";
import { fetchUserList, deleteUser } from "../userManageService";



export function userListReducer(state = new UserListManageModule(), action: AnyAction): UserListManageModule {
  switch (action.type) {
    case "user_list_fetching":
      return {
        ...state,
        isWaiting: true
      };
    case "user_list_fetched":
      return {
        ...state,
        userList: action["userList"],
        isWaiting: false
      };
    case "user_deleting":
      return {
        ...state,
        isWaiting: true
      };
    default:
      return state;
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userListManage: state[StoreModuleKey.userList]
  };
};

export async function fetchUser(dispatch: Dispatch) {
  dispatch({
    type: "user_list_fetching"
  });

  let list = await fetchUserList();
  dispatch({
    type: "user_list_fetched",
    userList: list
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: async () => {
      await fetchUser(dispatch);
    },
    delete: async (userData: UserModule) => {
      dispatch({
        type: "user_deleting"
      });
      await deleteUser(userData.id);
      await fetchUser(dispatch);
    },
    edit: async (userData: UserModule) => {
      dispatch({
        type: "user_edit_open",
        userData: userData
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent) as any;
