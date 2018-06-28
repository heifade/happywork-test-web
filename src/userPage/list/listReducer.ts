import { AnyAction, Dispatch } from "redux";
import { PageModule } from "./listModule";
import { ListReducer } from "../../pageBase/list/listReducer";

class UserListReducer extends ListReducer {
  constructor() {
    super();
  }

  // reducer(state = new PageModule(), action: AnyAction): PageModule {
  //   return super.reducer(state, action);
  // }

  // mapDispatchToProps(dispatch: Dispatch) {
  //   return super.mapDispatchToProps(dispatch);
  // }
}

export const userListReducer = new UserListReducer();
