export class UserModule {
  public id: string;
  public name: string;
}

export class UserEditManageModule {
  public user: UserModule = null;
  public isEditing: boolean = false;
  public isWaiting: boolean = false;
}
