export class EditItemModule {
  public id: string;
  public name: string;
}

export class PageModule {
  public item: EditItemModule = null;
  public isEditing: boolean = false;
  public isWaiting: boolean = false;
}
