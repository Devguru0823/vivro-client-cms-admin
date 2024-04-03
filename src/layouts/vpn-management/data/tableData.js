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



export default function data(list, deleteList, editList, locationList) {
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
      <MenuItem onClick={() => closeMenu(i)}>Disable</MenuItem>
      <MenuItem onClick={() => deleteItem(i)}>Delete</MenuItem>
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
      { Header: "IP Addr", accessor: "ipaddr", align: "left" },
      { Header: "Port", accessor: "port", align: "left" },
      { Header: "Assign To", accessor: "assignto", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "vpn", accessor: "vpn", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: list.map((item, i) =>
    ({
      ipaddr: <Project name={item.ip_addr} />,
      port: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.port}
        </MDTypography>
      ),
     
      location: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {locationList.filter(location => location.pk === item.location * 1)[0] ? locationList.filter(location => location.pk === item.location * 1)[0].name : item.location}
        </MDTypography>
      ),
      assignto: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.assign_to}
        </MDTypography>
      ),

      vpn: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <input type="checkbox" checked = {item.is_vpn*1 === 1}  readOnly/>
        </MDTypography>
      ),

      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          enabled
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
