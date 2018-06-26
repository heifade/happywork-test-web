import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { BaseEditComponent } from "./baseEdit";
import { StoreModuleKey } from "../../module";
import { wait } from "../../util/util";

export function baseEditReducer(state = {}, action: AnyAction): any {
  switch (action.type) {
    case "base_edit_open":
      return {
        ...state,
        isEditing: true,
        user: action["userData"]
      };
    case "base_edit_saving":
      return {
        ...state,
        isWaiting: true
      };
    case "base_edit_saved":
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    case "base_edit_cancel":
      return {
        ...state,
        isEditing: false
      };
    default:
      return state;
  }
}

function editSave() {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: "base_edit_saving"
    });

    await wait(500);
    dispatch({
      type: "base_edit_saved"
    });

    // await saveUser(userData);
    // await fetchUser(dispatch); // 调用userList的获取用户方法
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    baseEditManage: state[StoreModuleKey.userEdit]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    save: async (userEditManage: UserEditManageModule) => {
      dispatch(editSave(userEditManage.user!));
    },
    cancel: async () => {
      dispatch({
        type: "base_edit_cancel"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseEditComponent) as any;
