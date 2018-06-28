export class ListItemModule {
  public id: string;
  public name: string;
}

export class PageModule {
  public dataList: Array<ListItemModule> = [];
  public isWaiting: boolean = false;
}