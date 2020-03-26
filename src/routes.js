/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Inventory from "views/Inventory.js";
import TableList from "views/TableList.js";
import Trade from "views/Trade.js";
import MyTrades from "views/MyTrades.js";
import UserProfile from "views/UserProfile.js";
import SignIn from "views/SignIn.js";
import SignUp from "views/SignUp.js";

var routes = [
  {
    path: "/sign-in",
    name: "Sign In",
    rtlName: "Sign In",
    icon: "tim-icons icon-single-02",
    component: SignIn,
    layout: "/public"
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    rtlName: "Sign Up",
    icon: "tim-icons icon-single-02",
    component: SignUp,
    layout: "/public"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/inventory",
    name: "Inventory",
    rtlName: "Inventory",
    icon: "tim-icons icon-bullet-list-67",
    component: Inventory,
    layout: "/admin"
  },
  {
    path: "/trade",
    name: "Trade",
    rtlName: "Trade",
    icon: "tim-icons icon-basket-simple",
    component: Trade,
    layout: "/admin"
  },
  {
    path: "/my-trades",
    name: "My Trades",
    rtlName: "My Trades",
    icon: "tim-icons icon-cart",
    component: MyTrades,
    layout: "/admin"
  }
];
export default routes;
