import { ListItemModule } from "./list/listModule";
import { wait } from "../util/util";

let dataList: ListItemModule[];
function initDataList() {
  let list = new Array<ListItemModule>();
  for (let i = 0; i < 20; i++) {
    list.push({ id: `${i}`, name: `name${i}` });
  }
  dataList = list;
}

initDataList();

export async function fetchDataList() {
  await wait(500);
  return dataList;
}

export async function deleteData(id: string) {
  await wait(500);
  dataList = dataList.filter(u => u.id !== id);
}

export async function saveData(item: ListItemModule) {
  await wait(500);
  let d = dataList.find(m => m.id == item.id);
  d.name = item.name;
}
