
import { useState } from "react";
// import { useEffect } from "react";

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

// Data
import { useSelector, useDispatch } from "react-redux";
import tableData from "layouts/permissions/data/permissionsTableData";
import { createPermission, deletePermission, updatePermission } from "../../store/actions/permission";

const Comp = () => {
  const list = useSelector((state) => state.dashboard.permissions);
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [editMode, setEditMode] = useState(null)
  const [description, setDescription] = useState("")
  const refreshFields = () => {
    setEditMode(null);
    setName("");
    setDescription("");
  }

  const deleteList = (id) => {
    dispatch(deletePermission(id));
    refreshFields();
  }

  const editList = (item) => {
    // const item = list[i]
    setEditMode(item);
    setName(item.name);
    setDescription(item.description);
  }

  const showData = tableData(list, deleteList, editList);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value)


  const updateSubmit = () => {
    // console.log("name , description ", name, description)
    if (editMode)
      dispatch(updatePermission(editMode.pk, name, description));
    else
      dispatch(createPermission(name, description));
    refreshFields();
  }

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
                  Add Permission
                </MDTypography>

              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="Permission Name" fullWidth value={name} onChange={updateName} />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="text" label="Description" fullWidth value={description} onChange={updateDescription} />
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
                  Permission List
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
