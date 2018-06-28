import { connect } from "react-redux";
import { AnyAction, Dispatch, Reducer } from "redux";
import { BaseListComponent, Props } from "./baseList";
import { DataModule, DataListManageModule } from "./baseListModule";
import { StoreModuleKey } from "../../module";
import { fetchDataList, deleteData } from "../baseManageService";
import { TypePrefix as BaseEditTypePrefix } from "../baseEdit/baseEditReducer";

export const TypePrefix = "base_list_";

export function baseListReducer(state = new DataListManageModule(), action: AnyAction): DataListManageModule {
  switch (action.type.substr(TypePrefix.length)) {
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
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    dataList: state[StoreModuleKey.baseList]
  };
};

export async function fetchData(dispatch: Dispatch) {
  dispatch({
    type: `${TypePrefix}fetching`
  });

  let list = await fetchDataList();
  dispatch({
    type: `${TypePrefix}fetched`,
    dataList: list
  });
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: async () => {
      await fetchData(dispatch);
    },
    delete: async (data: DataModule) => {
      dispatch({
        type: `${TypePrefix}deleting`
      });
      await deleteData(data.id);
      await fetchData(dispatch);
    },
    edit: async (data: DataModule) => {
      dispatch({
        type: `${BaseEditTypePrefix}open`,
        data: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseListComponent) as any;
