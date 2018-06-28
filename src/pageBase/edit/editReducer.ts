import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { EditItemModule, PageModule } from "./editModule";
import { wait } from "../../util/util";
import { saveData } from "../pageBaseService";
import { listReducer } from "../list/listReducer";
import { v4 } from "uuid";

export class EditReducer {
  public readonly TypePrefix: string;
  constructor() {
    this.TypePrefix = v4();
  }

  reducer(state = new PageModule(), action: AnyAction): PageModule {
    switch (action.type.substr(this.TypePrefix.length)) {
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
        };
      default:
        return state;
    }
  }

  editSave(item: EditItemModule) {
    return async function(dispatch: Dispatch) {
      dispatch({
        type: `${this.TypePrefix}saving`
      });

      await wait(500);
      dispatch({
        type: `${this.TypePrefix}saved`
      });

      await saveData(item);
      await listReducer.fetchData(dispatch); // 调用baseList的获取数据方法
    };
  }

  mapStateToProps(state: any, ownProps: any) {
    return {
      pageModule: state[this.TypePrefix]
    };
  }

  mapDispatchToProps(dispatch: any) {
    return {
      save: async (item: EditItemModule) => {
        dispatch(this.editSave(item).bind(this));
      },
      cancel: async () => {
        dispatch({
          type: `${this.TypePrefix}cancel`
        });
      },
      onChange: async (item: any) => {
        dispatch({
          type: `${this.TypePrefix}formFieldsChanged`,
          item: item
        });
      }
    };
  }

  connect(component: any) {
    return connect(
      this.mapStateToProps.bind(this),
      this.mapDispatchToProps.bind(this)
    )(component) as any;
  }
}

export const editReducer = new EditReducer();
