
// @mui material components
import Icon from "@mui/material/Icon";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import GroupsIcon from '@mui/icons-material/Groups';
import PlaceIcon from '@mui/icons-material/Place';
import PropTypes from 'prop-types';

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
      id="group-menu"
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

  const HeadItem = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <PlaceIcon fontSize="small" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  HeadItem.propTypes = {
    name: PropTypes.string,
  };

  HeadItem.defaultProps = {
    name: ""
  }


  return {
    columns: [
      { Header: "Group Name", accessor: "groupname", align: "left" },
      { Header: "Description", accessor: "groupdescription", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: list.map((item, i) =>
    ({

      groupname: <HeadItem name={item.name} />,

      groupdescription: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.description}
        </MDTypography>
      ),

      location: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {locationList.filter(li=>li.pk===item.location)[0].name}
        </MDTypography>
      ),

      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          active
        </MDTypography>
      ),

      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon onClick={(e)=>openMenu(e, i)}>more_vert</Icon>
          {renderMenu(i)}
        </MDTypography>
      )
    })
    )
  };
}
