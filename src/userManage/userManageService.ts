import { UserModule } from "./userList/userListModule";
import { wait } from "../util/util";

let userList: UserModule[];
function initUserList() {
  let list = new Array<UserModule>();
  for (let i = 0; i < 20; i++) {
    list.push({ id: `${i}`, name: `name${i}` });
  }
  userList = list;
}

initUserList();

export async function fetchUserList() {
  await wait(500);
  return userList;
}

export async function deleteUser(id: string) {
  await wait(500);
  userList = userList.filter(u => u.id !== id);
}

export async function saveUser(user: UserModule) {
  await wait(500);
  let data = userList.find(m => m.id == user.id);
  data.name = user.name;
}
