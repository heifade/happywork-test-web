import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import BaseEditComponent from "./baseEdit";
import { DataModule, DataEditManageModule } from "./baseEditModule";
import { StoreModuleKey } from "../../module";
import { wait } from "../../util/util";
import { saveData } from "../baseManageService";
import { fetchData } from "../baseList/baseListReducer";

export const TypePrefix = "base_edit_";

export function baseEditReducer(state = new DataEditManageModule(), action: AnyAction): DataEditManageModule {
  switch (action.type.substr(TypePrefix.length)) {
    case "open":
      return {
        ...state,
        isEditing: true,
        data: action["data"]
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
        data: action["data"]
      }
    default:
      return state;
  }
}

function editSave(data: DataModule) {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: `${TypePrefix}saving`
    });

    await wait(500);
    dispatch({
      type: `${TypePrefix}saved`
    });

    await saveData(data);
    await fetchData(dispatch); // 调用baseList的获取数据方法
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    dataEditManage: state[StoreModuleKey.baseEdit]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    save: async (data: DataModule) => {
      dispatch(editSave(data));
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
)(BaseEditComponent) as any;
