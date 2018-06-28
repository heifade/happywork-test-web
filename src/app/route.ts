import { MenuModule } from "./modules";
import { Index } from "../index/index";
import { UserManage } from "../userManage/userManage";
import { PageBase } from "../pageBase/pageBase";
import { UserPage } from "../userPage/userPage";

export let menuList: Array<MenuModule> = [
  { title: "主页", path: "/index", img: "home" },
  { title: "系统设置", path: "/system", img: "setting" },
  { title: "用户管理", path: "/system/user", img: "user" },
  { title: "角色管理", path: "/system/role", img: "solution" },
  { title: "基类", path: "/system/base", img: "solution" },
  { title: "用户管理2", path: "/system/user2", img: "solution" }
];

export let routeList: Array<{ path: string; component: any }> = [{ path: "/index", component: Index }, { path: "/system/user", component: UserManage }, { path: "/system/base", component: PageBase }, { path: "/system/user2", component: UserPage }];
