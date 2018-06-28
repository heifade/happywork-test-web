import { DataModule } from "./baseList/baseListModule";
import { wait } from "../util/util";

let dataList: DataModule[];
function initDataList() {
  let list = new Array<DataModule>();
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

export async function saveData(data: DataModule) {
  await wait(500);
  let d = dataList.find(m => m.id == data.id);
  d.name = data.name;
}
