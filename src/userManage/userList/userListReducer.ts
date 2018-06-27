import { connect } from "react-redux";
import { AnyAction, Dispatch, Reducer } from "redux";
import { UserListComponent, Props } from "./userList";
import { UserModule, UserListManageModule } from "./userListModule";
import { StoreModuleKey } from "../../module";
import { fetchUserList, deleteUser } from "../userManageService";
import { TypePrefix as UserEditTypePrefix } from "../userEdit/userEditReducer";

export const TypePrefix = "user_list_";

export function userListReducer(state = new UserListManageModule(), action: AnyAction): UserListManageModule {
  switch (action.type.substr(TypePrefix.length)) {
    case "fetching":
      return {
        ...state,
        isWaiting: true
      };
    case "fetched":
      return {
        ...state,
        userList: action["userList"],
        isWaiting: false
      };
    case "deleting":
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
    type: `${TypePrefix}fetching`
  });

  let list = await fetchUserList();
  dispatch({
    type: `${TypePrefix}fetched`,
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
        type: `${TypePrefix}deleting`
      });
      await deleteUser(userData.id);
      await fetchUser(dispatch);
    },
    edit: async (userData: UserModule) => {
      dispatch({
        type: `${UserEditTypePrefix}open`,
        userData: userData
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent) as any;
