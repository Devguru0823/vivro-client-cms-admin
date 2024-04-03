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
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

const defaultImg = require("../../../assets/images/mark-icon.jpg");


export default function data(list, deleteList, editList) {
  const [menu, setMenu] = useState({});

  const openMenu = ({currentTarget}, i) => {
    const updateMenu = {...menu};
    updateMenu[`key-${i}`] = currentTarget;
    setMenu(updateMenu);
  }

  const closeMenu = (i) => {
    const updateMenu = {...menu};
    updateMenu[`key-${i}`] = null;
    setMenu(updateMenu);
  }

  const deleteItem = (i)=>{
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
      onClose={()=>closeMenu(i)}
    >
      <MenuItem onClick={()=>editItem(i)}>Edit</MenuItem>
      <MenuItem onClick={()=>closeMenu(i)}>Disable</MenuItem>
      <MenuItem onClick={()=>deleteItem(i)}>Delete</MenuItem>
    </Menu>
  );



  return {
    columns: [
      { Header: "Logo", accessor: "avartar", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Description", accessor: "description", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: list.map((item, i) =>
    (
      {
        avartar:  (
          <MDAvatar src={item.logo_img?item.logo_img:defaultImg} name="Logo Image" size="sm" />         
        ),
        name: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {item.name}
          </MDTypography>
        ),
        description: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {item.description}
          </MDTypography>
        ),
       
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            active
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon onClick={(target)=>openMenu(target, i)}>more_vert</Icon>
            {renderMenu(i)}
          </MDTypography>
        ),
      }      
    )
    )



  };
}
