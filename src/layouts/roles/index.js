
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
import Switch from "@mui/material/Switch";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Data
import tableData from "layouts/roles/data/rolesTableData";
import { useSelector, useDispatch } from "react-redux";
import { createRole, deleteRole, updateRole } from "../../store/actions/user_role";


const Comp = () => {
  const list = useSelector((state) => state.dashboard.user_roles)
  const permissionList = useSelector((state) => state.dashboard.permissions)
  const dispatch = useDispatch()
  const [permissions, setPermissions] = useState({})
  const [name, setName] = useState("")
  const [editMode, setEditMode] = useState(null)
  const [description, setDescription] = useState("")

  const handleSetRememberMe = (pk) => {
    const newArr = { ...permissions }
    newArr[`per-${pk}`] = !newArr[`per-${pk}`]
    setPermissions(newArr)
  }

  const refreshFields = () => {
    setEditMode(null);
    setName("");
    setDescription("");
    setPermissions({});
  }

  const deleteList = (pk) => {
    dispatch(deleteRole(pk));
    refreshFields()
  }

  const editList = (i) => {
    const item = list[i]
    // console.log("edit item : ", item)
    setEditMode(item)
    setName(item.name)
    setDescription(item.description)
    setPermissions(item.permissions)
  }

  const showData = tableData(list, deleteList, editList)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)

  const updateSubmit = () => {    
    if (editMode)
      dispatch(updateRole(editMode.pk, name, description, permissions))
    else
      dispatch(createRole(name, description, permissions))
    refreshFields()
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
                  Add Role
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="Role Name" fullWidth value={name} onChange={updateName} />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="text" label="Description" fullWidth value={description} onChange={updateDescription} />
                  </MDBox>
                  <Grid container spacing={2}>
                    {
                      permissionList.map((item) =>
                        <Grid item xs={6} key={Math.random()}>
                          <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch checked={permissions[`per-${item.pk}`]} onChange={() => handleSetRememberMe(item.pk)} />
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              color="text"
                              onClick={() => handleSetRememberMe(item.pk)}
                              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                              &nbsp;{item.name}
                            </MDTypography>
                          </MDBox>
                        </Grid>
                      )
                    }
                  </Grid>
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
                  Role List
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
