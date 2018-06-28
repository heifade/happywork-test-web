

export const TypePrefix = "user_list_";

export function listReducer(state = new PageModule(), action: AnyAction): PageModule {
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