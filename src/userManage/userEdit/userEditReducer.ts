import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { UserEditComponent } from "./userEdit";
import { UserModule, UserEditManageModule } from "./userEditModule";
import { StoreModuleKey } from "../../module";
import { wait } from "../../util/util";

export function userEditReducer(state = new UserEditManageModule(), action: AnyAction): UserEditManageModule {
  switch (action.type) {
    case "user_edit":
      return {
        ...state,
        isEditing: true,
        user: action["userData"]
      };
    case "user_edit_username_changed":
      return {
        ...state,
        user: {
          ...state.user!,
          name: action["value"]
        }
      };
    case "user_edit_saving":
      return {
        ...state,
        isWaiting: true
      };
    case "user_edit_saved":
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    case "user_edit_cancel":
      return {
        ...state,
        isEditing: false
      };
    default:
      return state;
  }
}

function editSave(userData: UserModule) {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: "user_edit_saving"
    });

    await wait(500);

    dispatch({
      type: "user_edit_saved"
    });

    await wait(500);
    dispatch({
      type: "user_saved",
      userData
    });
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userEditManage: state[StoreModuleKey.userEdit]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    userNameChanged: (value: string) => {
      dispatch({
        type: "user_edit_username_changed",
        value: value
      });
    },
    save: (userEditManage: UserEditManageModule) => {
      dispatch(editSave(userEditManage.user!));
    },
    cancel: () => {
      dispatch({
        type: "user_edit_cancel"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditComponent) as any;
