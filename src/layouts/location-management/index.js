
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// Data
import locationTableData from "./data/locationData";
import subLocationTableData from "./data/subLocationData";



import { createLocation, deleteLocation, updateLocation, deleteSubLocation, updateSubLocation, createSubLocation } from "../../store/actions/locations";



const Comp = () => {
  const locationList = useSelector((state) => state.dashboard.locations);
  const subLocationList = useSelector((state) => state.dashboard.sublocations);
  
  const dispatch = useDispatch();
  // const { columns: pColumns, rows: pRows } = userData();
  const [lName, setLName] = useState("");
  const [lDescription, setLDescription] = useState("");
  const [slName, setSLName] = useState("");
  const [slDescription, setSLDescription] = useState("");
  const [slLocation, setSLLocation] = useState(0);
  const [editLMode, setEditLMode] = useState(null);
  const [editSLMode, setEditSLMode] = useState(null);

  const handleChangeLocation = (event) => {
    setSLLocation(event.target.value);
  };



  const updateLName = (e) => setLName(e.target.value)
  const updateLDescription = (e) => setLDescription(e.target.value)
  const updateSLName = (e) => setSLName(e.target.value)
  const updateSLDescription = (e) => setSLDescription(e.target.value)

  const refreshLFields = () => {
    setEditLMode(null)
    setLName("")
    setLDescription("")    
  }

  const refreshSLFields = () => {
    setEditSLMode(null)
    setSLName("")
    setSLDescription("")
    setSLLocation(0)
  }

  const deleteLList = (pk) => {
    dispatch(deleteLocation(pk));
    refreshLFields();
  }

  const editLList = (i) => {
    const item = locationList[i];
    setEditLMode(item);
    setLName(item.name);
    setLDescription(item.description);
  }

  const editSLList = (i) => {
    const item = subLocationList[i];
    setEditSLMode(item);
    setSLName(item.name);
    setSLDescription(item.description);
    setSLLocation(item.location);
  }

  const deleteSLList = (pk) => {
    dispatch(deleteSubLocation(pk));
    refreshSLFields();
  }





  const updateLSubmit = () => {
    if (editLMode)
      dispatch(updateLocation(editLMode.pk, lName, lDescription))
    else
      dispatch(createLocation(lName, lDescription))      
    refreshLFields()
  }

  const updateSLSubmit = () => {
    if (editSLMode)
      dispatch(updateSubLocation(editSLMode.pk, slName, slDescription, slLocation))
    else
      dispatch(createSubLocation(slName, slDescription, slLocation))
    refreshSLFields()
  }


  const locationData = locationTableData(locationList, deleteLList, editLList);
  const subLocationData = subLocationTableData(subLocationList, deleteSLList, editSLList, locationList);

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
                  Add Location
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Name" fullWidth value={lName} onChange={updateLName} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Description" fullWidth value={lDescription} onChange={updateLDescription} />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color={editLMode ? "success" : "info"} fullWidth onClick={updateLSubmit}>
                      {editLMode ? "Update" : "Add"}
                    </MDButton>
                  </MDBox>
                  <MDBox mt={1} mb={1}>
                    <MDButton variant="gradient" color="error" fullWidth onClick={refreshLFields}>
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
                  Location List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={locationData}
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
                  Sub Location
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Location</InputLabel>

                        <Select
                          labelId="demo-simple-select-helper-label"
                          
                          value={slLocation}
                          
                          onChange={handleChangeLocation}
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
                    <MDInput type="text" label="Name" fullWidth value={slName} onChange={updateSLName} />
                  </MDBox>             
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Description" fullWidth value={slDescription} onChange={updateSLDescription} />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color={editSLMode ? "success" : "info"} fullWidth onClick={updateSLSubmit}>
                      {editSLMode ? "Update" : "Add"}
                    </MDButton>
                  </MDBox>
                  <MDBox mt={1} mb={1}>
                    <MDButton variant="gradient" color="error" fullWidth onClick={refreshSLFields}>
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
                  Sub Location List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={subLocationData}
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
