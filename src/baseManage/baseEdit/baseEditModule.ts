export class DataModule {
  public id: string;
  public name: string;
}

export class DataEditManageModule {
  public data: DataModule = null;
  public isEditing: boolean = false;
  public isWaiting: boolean = false;
}
