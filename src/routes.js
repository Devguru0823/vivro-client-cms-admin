/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Peter Y (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
import UserRole from "layouts/roles";
import UserPermission from "layouts/permissions";
import UserManagement from "layouts/user-management";
import AssetManagement from "layouts/asset-management";
import SystemManagement from "layouts/systems";
import VPNManagement from "layouts/vpn-management";
import LocationManagement from "layouts/location-management";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
// @mui icons
import Icon from "@mui/material/Icon";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SourceIcon from '@mui/icons-material/Source';
import HubIcon from '@mui/icons-material/Hub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    
  },
  {
    type: "collapse",
    name: "Permissions",
    key: "dashboard/permissions",
    icon: <AdminPanelSettingsIcon fontSize="small" />,
    route: "/dashboard/permissions",
    component: <UserPermission />,
  },
  {
    type: "collapse",
    name: "User Roles",
    key: "dashboard/user-roles",
    icon: <ManageAccountsIcon fontSize="small" />,
    route: "/dashboard/user-roles",
    component: <UserRole />,
  },

  {
    type: "collapse",
    name: "User Management",
    key: "dashboard/user-management",
    icon: <GroupAddIcon fontSize="small" />,
    route: "/dashboard/user-management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Locations",
    key: "dashboard/locations",
    icon: <LocationOnIcon fontSize="small" />,
    route: "/dashboard/locations",
    component: <LocationManagement />,
  },

  {
    type: "collapse",
    name: "Systems",
    key: "dashboard/system-management",
    icon: <SettingsSuggestIcon fontSize="small" />,
    route: "/dashboard/system-management",
    component: <SystemManagement />,
  },

  {
    type: "collapse",
    name: "Asset Management",
    key: "dashboard/asset-management",
    icon: <SourceIcon fontSize="small" />,
    route: "/dashboard/asset-management",
    component: <AssetManagement />,
  },

  {
    type: "collapse",
    name: "Connections",
    key: "dashboard/connection-management",
    icon: <HubIcon fontSize="small" />,
    route: "/dashboard/connection-management",
    component: <VPNManagement />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "hide",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/dashboard/notifications",
    component: <Notifications />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "hide",
    name: "Log Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/dashboard/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
