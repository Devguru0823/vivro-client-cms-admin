
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// import Switch from "@mui/material/Switch";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';

import { useSelector, useDispatch } from "react-redux";

// Data
import tableData from "./data/tableData";

// Redux Stuff
import { createAsset, deleteAsset, updateAsset } from "../../store/actions/assets";


const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 2;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Comp = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.dashboard.assets);
  const locationList = useSelector((state) => state.dashboard.locations);
  const subLocationList = useSelector((state) => state.dashboard.sublocations);
  const systemList = useSelector((state) => state.dashboard.systems);
  const groupList = useSelector((state) => state.dashboard.groups);

  const [editMode, setEditMode] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const [deviceLocation, setDeviceLocation] = useState("");
  const [deviceID, setDeviceID] = useState(`d-${Date.now()}`);
  const [groupId, setGroupId] = useState(0);

  
  const [appUrl, setAppUrl] = useState("")
  const [appUsername, setAppUsername] = useState("")
  const [appUserPwd, setAppUserPwd] = useState("")

  const [nameQuery, setNameQuery] = useState("")
  const [pwdQuery, setPwdQuery] = useState("")
  const [loginQuery, setLoginQuery] = useState("")

  const [checkedSystems, setCheckedSystems] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const refreshFields = () => {
    setEditMode(null);
    setName("");
    setLocation(0);
    setSubLocation(0);
    setDeviceLocation(0);
    setGroupId(0);
    setDeviceID(`d-${Date.now()}`);
    setCheckedSystems([]);
    setCheckedUsers([]);
    
    setNameQuery("");
    setPwdQuery("");
    setLoginQuery("");
    setAppUrl("");
    setAppUsername("");
    setAppUserPwd("");
  }

  const deleteList = (url) => {
    dispatch(deleteAsset(url));
    refreshFields();
  }

  const editList = (i) => {
    const item = list[i]
    const jsonData = item.json_obj
    setEditMode(item)
    setName(item.name)
    setLocation(item.location * 1)
    setSubLocation(item.sub_location * 1)
    setCheckedSystems(jsonData.systems ? jsonData.systems : [])
    setCheckedUsers(jsonData.users ? jsonData.users : [])
    setDeviceLocation(item.device_location)
    setDeviceID(item.device_id)
    setGroupId(jsonData.group_id ? (jsonData.group_id * 1) : 0)

    
    setNameQuery(item.username_query);
    setPwdQuery(item.userpwd_query);
    setLoginQuery(item.login_query);
    setAppUrl(item.app_url);
    setAppUsername(item.app_username);
    setAppUserPwd(item.app_userpwd);

  }

  const showData = tableData(list, deleteList, editList, locationList, subLocationList);
  const updateName = (e) => setName(e.target.value);
  const updateDeviceLocation = (e) => setDeviceLocation(e.target.value);
  const updateDeviceID = (e) => setDeviceID(e.target.value);

  const updateNameQuery = (e) => setNameQuery(e.target.value);
  const updatePwdQuery = (e) => setPwdQuery(e.target.value);
  const updateLoginQuery = (e) => setLoginQuery(e.target.value);

  const updateAppUrl = (e) => setAppUrl(e.target.value);
  const updateAppUsername = (e) => setAppUsername(e.target.value);
  const updateAppUserPwd = (e) => setAppUserPwd(e.target.value);

  const selectGroup = (event) => {
    setGroupId(event.target.value * 1)
    setCheckedUsers([])
  }


  const updateSubmit = () => {

    if (editMode) {
      const oldJson = editMode.json_obj
      const jsonData = { ...oldJson, systems: checkedSystems, users: checkedUsers, group_id: groupId }

      dispatch(updateAsset(editMode.pk, name, location, subLocation, deviceLocation, deviceID, jsonData, appUrl, appUsername, appUserPwd, nameQuery, pwdQuery, loginQuery));
    }
    else {
      dispatch(createAsset(name, location, subLocation, deviceLocation, deviceID, { systems: checkedSystems, users: checkedUsers, group_id: groupId }, appUrl, appUsername, appUserPwd, nameQuery, pwdQuery, loginQuery));

    }
    refreshFields();
  }

  const selectLocation = (event) => {
    setLocation(event.target.value);
  };

  const selectSubLocation = (event) => {
    setSubLocation(event.target.value);
  };

  const selectSystems = (event) => {
    const {
      target: { value },
    } = event;
    setCheckedSystems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const renderCheckedSystems = (items) => {
    const selectedSystem = []
    items.map(selected => {
      const system = systemList.filter(item => item.pk === selected)[0]
      if (system)
        selectedSystem.push(system.name)
      return selected
    })
    return selectedSystem.join(", ")
  }


 

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} className="asset-management">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Add Asset
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Asset Name" fullWidth value={name} onChange={updateName} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel>Location</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"

                          value={location}

                          onChange={selectLocation}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          {
                            locationList.map(item => <MenuItem key={Math.random()} value={item.pk}>{item.name}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>
                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel>Sub Location</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={subLocation}

                          onChange={selectSubLocation}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          {
                            subLocationList.filter(item => item.location === location).map(item => <MenuItem key={Math.random()} value={item.pk}>{item.name}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Device Location" fullWidth value={deviceLocation} onChange={updateDeviceLocation} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Device ID" fullWidth value={deviceID} onChange={updateDeviceID} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="App Url" fullWidth value={appUrl} onChange={updateAppUrl} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="App Username" fullWidth value={appUsername} onChange={updateAppUsername} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="App Password" fullWidth value={appUserPwd} onChange={updateAppUserPwd} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Username Query" fullWidth value={nameQuery} onChange={updateNameQuery} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Userpwd Query" fullWidth value={pwdQuery} onChange={updatePwdQuery} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Login Button Query" fullWidth value={loginQuery} onChange={updateLoginQuery} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel>Systems</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          multiple
                          value={checkedSystems}
                          onChange={selectSystems}
                          input={<OutlinedInput label="Systems" />}
                          renderValue={(selected) => `${renderCheckedSystems(selected)}`}
                          MenuProps={MenuProps}
                        >
                          {systemList.map((item) => (
                            <MenuItem key={item.pk} value={item.pk} className="multi-assign-item">
                              <Checkbox checked={checkedSystems.indexOf(item.pk) > -1} />
                              <ListItemText primary={item.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>

                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel>Assign Group</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"

                          value={groupId}
                          label="Group"
                          onChange={selectGroup}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          {
                            groupList.map(item => <MenuItem key={Math.random()} value={item.pk}>{item.name}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>




                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color={editMode ? "success" : "info"} fullWidth onClick={updateSubmit}>
                      {editMode ? "Update" : "Add"}
                    </MDButton>
                  </MDBox>
                  <MDBox mt={1} mb={1}>
                    <MDButton variant="gradient" color="error" fullWidth onClick={refreshFields}>
                      Cancel
                    </MDButton>
                  </MDBox>

                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={9}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Asset List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={showData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Comp;
