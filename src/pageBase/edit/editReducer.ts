import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import EditComponent from "./edit";
import { EditItemModule, PageModule } from "./editModule";
import { StoreModuleKey } from "../../module";
import { wait } from "../../util/util";
import { saveData } from "../pageBaseService";
import { fetchData } from "../list/listReducer";

export const TypePrefix = "base_edit_";

export function editReducer(state = new PageModule(), action: AnyAction): PageModule {
  switch (action.type.substr(TypePrefix.length)) {
    case "open":
      return {
        ...state,
        isEditing: true,
        item: action["item"]
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
        item: action["item"]
      }
    default:
      return state;
  }
}

function editSave(item: EditItemModule) {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: `${TypePrefix}saving`
    });

    await wait(500);
    dispatch({
      type: `${TypePrefix}saved`
    });

    await saveData(item);
    await fetchData(dispatch); // 调用baseList的获取数据方法
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    pageModule: state[StoreModuleKey.baseEdit]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    save: async (item: EditItemModule) => {
      dispatch(editSave(item));
    },
    cancel: async () => {
      dispatch({
        type: `${TypePrefix}cancel`
      });
    },
    onChange: async (item: any) => {
      dispatch({
        type: `${TypePrefix}formFieldsChanged`,
        item: item
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComponent) as any;
