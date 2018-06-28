export class DataModule {
  public id: string;
  public name: string;
}

export class DataListManageModule {
  public dataList: Array<DataModule> = [];
  public isWaiting: boolean = false;
}