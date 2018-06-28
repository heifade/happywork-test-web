import { connect } from "react-redux";
import { AnyAction, Dispatch, Reducer } from "redux";
import { ListComponent, Props } from "./list";
import { ListItemModule, PageModule } from "./listModule";
import { StoreModuleKey } from "../../module";
import { fetchDataList, deleteData } from "../pageBaseService";
import { editReducer } from "../edit/editReducer";
import { v4 } from "uuid";

export class ListReducer {
  public readonly TypePrefix: string;
  constructor() {
    this.TypePrefix = v4();
  }

  reducer = (state = new PageModule(), action: AnyAction): PageModule => {
    switch (action.type.substr(this.TypePrefix.length)) {
      case "fetching":
        return {
          ...state,
          isWaiting: true
        };
      case "fetched":
        return {
          ...state,
          dataList: action["dataList"],
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
  };

  mapStateToProps = (state: any, ownProps: any) => {
    return {
      pageModule: state[StoreModuleKey.baseList]
    };
  };

  fetchData = async function(dispatch: Dispatch) {
    dispatch({
      type: `${this.TypePrefix}fetching`
    });

    let list = await fetchDataList();
    dispatch({
      type: `${this.TypePrefix}fetched`,
      dataList: list
    });
  };

  mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      fetch: async () => {
        await this.fetchData(dispatch);
      },
      delete: async (item: ListItemModule) => {
        dispatch({
          type: `${this.TypePrefix}deleting`
        });
        await deleteData(item.id);
        await this.fetchData(dispatch);
      },
      edit: async (item: ListItemModule) => {
        dispatch({
          type: `${editReducer.TypePrefix}open`,
          item: item
        });
      }
    };
  };

  connect = () => {
    return connect(
      this.mapStateToProps.bind(this),
      this.mapDispatchToProps.bind(this)
    )(ListComponent) as any;
  };
}

export const listReducer = new ListReducer();
