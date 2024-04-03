
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


import { useSelector, useDispatch } from "react-redux";


// Data
import tableData from './data/tableData';
import { createVPN, deleteVPN, updateVPN } from "../../store/actions/vpns";

const Comp = () => {
  
  const list = useSelector((state) => state.dashboard.vpns);
  const locationList = useSelector((state) => state.dashboard.locations);

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [ipAddr, setIpAddr] = useState("0.0.0.0");
  const [port, setPort] = useState("80");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [isVPN, setIsVPN] = useState(0);
  const [location, setLocation] = useState(0);


  const refreshFields = () => {
    setEditMode(null)
    setIpAddr("0.0.0.0")
    setPort("80")
    setDescription("")
    setAssignTo("")
    setLocation(0)
    setIsVPN(0)
  };

  const deleteList = (url) => {
    dispatch(deleteVPN(url));
    refreshFields();
  };

  const editList = (i) => {
    const item = list[i]
    setEditMode(item)
    setIpAddr(item.ip_addr)
    setPort(item.port)
    setDescription(item.description)
    setAssignTo(item.assign_to)
    setLocation(item.location * 1)
    setIsVPN(item.is_vpn * 1)
  };

  const showData = tableData(list, deleteList, editList, locationList);
  const updateIpAddr = (e) => setIpAddr(e.target.value);
  const updatePort = (e) => setPort(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAssignTo = (e) => setAssignTo(e.target.value);

  const updateSubmit = () => {
    if (editMode)
      dispatch(updateVPN(editMode.pk, ipAddr, port, description, assignTo, location, isVPN));
    else
      dispatch(createVPN(ipAddr, port, description, assignTo, location, isVPN));
    refreshFields();
  }
  const selectLocation = (event) => {
    setLocation(event.target.value);
  };

  const selectIsVpn = (event) => {
    setIsVPN(event.target.value * 1);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
                  Add Connection
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">                  
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="IP Address" fullWidth value={ipAddr} onChange={updateIpAddr} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Port" fullWidth value={port} onChange={updatePort} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Description" fullWidth value={description} onChange={updateDescription} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Assign To" fullWidth value={assignTo} onChange={updateAssignTo} />
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
                        <InputLabel>VPN</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          
                          value={isVPN}
                          
                          onChange={selectIsVpn}
                        >
                          <MenuItem value={0}>
                            <em>False</em>
                          </MenuItem>
                          <MenuItem value={1}>
                            <em>True</em>
                          </MenuItem>
                          
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
                  Connection List
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
