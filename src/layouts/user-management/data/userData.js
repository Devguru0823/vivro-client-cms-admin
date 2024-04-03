/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function data(list, deleteList, editList, activateList, groupList, roleList, detailList) {
  const [menu, setMenu] = useState({});

  const openMenu = (e, i) => {
    e.preventDefault()
    const updateMenu = {...menu};
    updateMenu[`key-${i}`] = e.currentTarget;
    setMenu(updateMenu);
  }

  const closeMenu = (i) => {
    const updateMenu = { ...menu };
    updateMenu[`key-${i}`] = null;
    setMenu(updateMenu);
  }

  const deleteItem = (i) => {
    const item = list[i]
    deleteList(item.pk);
    closeMenu(i);
  }

  const editItem = (i) => {
    editList(i);
    closeMenu(i);
  }

  const detailItem = (i) =>{ 
    detailList(i)
    closeMenu(i)
  }

  const renderMenu = (i) => (
    <Menu
      id="simple-menu"
      anchorEl={menu[`key-${i}`]}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu[`key-${i}`])}
      onClose={() => closeMenu(i)}
    >
      <MenuItem onClick={() => editItem(i)}>Edit</MenuItem>
      <MenuItem onClick={() => {activateList(i); closeMenu(i);}}>{list[i].is_active?"Disable":"Enable"}</MenuItem>
      <MenuItem onClick={() => deleteItem(i)}>Delete</MenuItem>
      <MenuItem onClick={() => detailItem(i)}>Details</MenuItem>
    </Menu>
  );

  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <AccountCircleIcon fontSize="small" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );


  return {
    columns: [
      { Header: "User Name", accessor: "username", align: "left" },
      { Header: "User Email", accessor: "useremail", align: "left" },
      { Header: "Group", accessor: "group", align: "left" },
      { Header: "Role", accessor: "user_role", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "waiting", accessor: "waiting", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: list.map((item, i) =>
    ({
      username: <Project name={item.username} />,
      useremail: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.email}
        </MDTypography>
      ),
      group: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {groupList.filter(group => group.pk === item.json_obj.group_id)[0] ? groupList.filter(group => group.pk === item.json_obj.group_id)[0].name : "Unset"}
        </MDTypography>
      ),
      user_role: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {roleList.filter(role => role.pk === item.user_role)[0] ? roleList.filter(role => role.pk === item.user_role)[0].name : "Unset"}
        </MDTypography>
      ),
      waiting: (
        <MDTypography component="a" href="#" variant="caption" color={item.is_waiting?'error':'success'} fontWeight="medium">
          {item.is_waiting?'waiting':'checked'}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color={item.is_active?'success':'text'} fontWeight="medium">
          {item.is_active?'active':'inactive'}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon onClick={(e)=>openMenu(e, i)}>more_vert</Icon>
          {renderMenu(i)}
        </MDTypography>
      ),
    })
    )
  };
}
