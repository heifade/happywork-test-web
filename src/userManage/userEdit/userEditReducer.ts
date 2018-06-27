import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import UserEditComponent from "./userEdit";
import { UserModule, UserEditManageModule } from "./userEditModule";
import { StoreModuleKey } from "../../module";
import { wait } from "../../util/util";
import { saveUser } from "../userManageService";
import { fetchUser } from "../userList/userListReducer";

export const TypePrefix = "user_edit_";

export function userEditReducer(state = new UserEditManageModule(), action: AnyAction): UserEditManageModule {
  switch (action.type.substr(TypePrefix.length)) {
    case "open":
      return {
        ...state,
        isEditing: true,
        user: action["userData"]
      };
    case "saving":
      return {
        ...state,
        isWaiting: true
      };
    case "saved":
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    case "cancel":
      return {
        ...state,
        isEditing: false
      };
    case "formFieldsChanged":
      return {
        ...state,
        user: action["data"]
      }
    default:
      return state;
  }
}

function editSave(userData: UserModule) {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: `${TypePrefix}saving`
    });

    await wait(500);
    dispatch({
      type: `${TypePrefix}saved`
    });

    await saveUser(userData);
    await fetchUser(dispatch); // 调用userList的获取用户方法
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userEditManage: state[StoreModuleKey.userEdit]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    save: async (user: UserModule) => {
      dispatch(editSave(user));
    },
    cancel: async () => {
      dispatch({
        type: `${TypePrefix}cancel`
      });
    },
    onChange: async (changedFields: any) => {
      dispatch({
        type: `${TypePrefix}formFieldsChanged`,
        data: changedFields
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditComponent) as any;
