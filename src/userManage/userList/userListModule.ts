export class UserModule {
  public id: string;
  public name: string;
}

export class UserListManageModule {
  public userList: Array<UserModule> = [];
  public isWaiting: boolean = false;
}