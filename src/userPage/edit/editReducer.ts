import { EditReducer } from "../../pageBase/edit/editReducer";
import { PageModule } from "./editModule";
import { AnyAction } from "redux";


export class UserEditReducer extends EditReducer {
  constructor() {
    super();
  }

  // reducer = (state = new PageModule(), action: AnyAction): PageModule => {
  //   return super.reducer(state, action);
  // }


}

export const userEditReducer = new UserEditReducer();

