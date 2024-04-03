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
import { useState } from "react";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Icon from "@mui/material/Icon";

// @mui material components
// import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import { useSelector } from "react-redux";



export default function data(list, deleteList, editList) {
  const [menu, setMenu] = useState({});

  const openMenu = (e, i) => {
    e.preventDefault()
    const updateMenu = {...menu};
    updateMenu[`key-${i}`] = e.currentTarget;
    setMenu(updateMenu);
  }

  const closeMenu = (i) => {
    const updateMenu = {...menu};
    updateMenu[`key-${i}`] = null;
    setMenu(updateMenu);
  }

  const deleteItem = (item)=>{
    deleteList(item.pk);
    closeMenu(item.pk);
  }

  const editItem = (i) => {
    editList(i);
    closeMenu(i.pk);
  }

  const renderMenu = (item) => (
    <Menu
      anchorEl={menu[`key-${item.pk}`]}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu[`key-${item.pk}`])}
      onClose={()=>closeMenu(item.pk)}
    >
      <MenuItem onClick={()=>editItem(item)}>Edit</MenuItem>
      <MenuItem onClick={()=>closeMenu(item.pk)}>Disable</MenuItem>
      <MenuItem onClick={()=>deleteItem(item)}>Delete</MenuItem>
    </Menu>
  );

  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <AccountTreeIcon fontSize="small" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );


  return {
    columns: [
      { Header: "title", accessor: "project", width: "30%", align: "left" },
      { Header: "description", accessor: "description", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows:
      list.map((item) =>
      ({
        project: <Project name={item.name} />,
        description: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {item.description}
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            enabled
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon onClick={(e)=>openMenu(e, item.pk)}>more_vert</Icon>
            {renderMenu(item)}
          </MDTypography>
        ),
      })
      )

    ,
  };
}
