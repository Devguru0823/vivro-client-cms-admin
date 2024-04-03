
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
import userData from "layouts/user-management/data/userData";
import groupTableData from "layouts/user-management/data/groupData";



import { createUser, deleteUser, updateUser, deleteGroup, updateGroup, createGroup, activateUser } from "../../store/actions/users";



const Comp = () => {

  const roleList = useSelector((state) => state.dashboard.user_roles);
  const userList = useSelector((state) => state.dashboard.users);
  const groupList = useSelector((state) => state.dashboard.groups);

  const dispatch = useDispatch();
  // const { columns: pColumns, rows: pRows } = userData();
  const [role, setRole] = useState(0);
  const [userGroup, setUserGroup] = useState(0);
  const [tagName, setTagName] = useState("");

  // const [userJson, setUserJson] = useState({ group_id: 0 });


  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeUserGroup = (event) => {
    setUserGroup(event.target.value);
    // setUserJson({ ...userJson, group_id: event.target.value })
  };

  const [username, setUserName] = useState("");
  const [groupname, setGroupName] = useState("");
  const [groupdescription, setGroupDescription] = useState("");
  const [userEditable, setUserEditable] = useState(false);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [customerID, setCustomerID] = useState(`cus-${Date.now()}`);
  const [password, setPassword] = useState("12345");
  const [editMode, setEditMode] = useState(null)
  const [editGroupMode, setEditGroupMode] = useState(null)


  const updateName = (e) => setUserName(e.target.value)
  const updateEmail = (e) => setEmail(e.target.value)
  const updateCompany = (e) => setCompany(e.target.value)
  const updateCustomerID = (e) => setCustomerID(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)
  const updateGroupName = (e) => setGroupName(e.target.value)
  const updateGroupDescription = (e) => setGroupDescription(e.target.value)
  const updateTagName = (e) => setTagName(e.target.value)

  const refreshFields = () => {
    setEditMode(null)
    setUserName("")
    setEmail("")
    setCompany("")
    setCustomerID("")
    setPassword("12345")
    setRole(0)
    // setUserJson({ group_id: 0 })
    setUserGroup(0)
    setUserEditable(false)
  }

  const refreshGroupFields = () => {
    setEditGroupMode(null)
    setGroupName("")
    setGroupDescription("")
    setTagName("")
  }

  const deleteList = (pk) => {
    dispatch(deleteUser(pk));
    // refreshFields();
  }

  const editList = (i) => {
    const item = userList[i]
    setEditMode(item);
    setUserName(item.username)
    setEmail(item.email)
    setCompany(item.company)
    setCustomerID(item.customer_id)
    setPassword("12345")
    setRole(item.user_role)
    const userJson = item.json_obj
    setUserGroup(userJson.group_id?userJson.group_id:0)
    setUserEditable(false)
  }

  const detailList = (i) => {
    const item = userList[i]
    setUserName(item.username)
    setEmail(item.email)
    setCompany(item.company)
    setCustomerID(item.customer_id)
    setRole(item.user_role)
    const userJson = item.json_obj
    setUserGroup(userJson.group_id?userJson.group_id:0)
    setUserEditable(true)
  }

  const activateList = (i) => {
    const item = userList[i]
    dispatch(activateUser(item.pk, item.is_active ? 0 : 1))
  }

  const deleteGroupList = (pk) => {
    dispatch(deleteGroup(pk));
    refreshGroupFields();
  }

  const editGroupList = (i) => {
    const item = groupList[i];
    setEditGroupMode(item);
    setGroupName(item.name);
    setGroupDescription(item.description);
    setTagName(item.tag_name)
  }

  const updateSubmit = () => {
    if (editMode){
      const oldJson = editMode.json_obj
      const userJson = {...oldJson, group_id: userGroup}
      dispatch(updateUser(editMode.pk, role, email, username, company, customerID, password, editMode.role_position ? editMode.role_position : "Customer", userJson))
    }      
    else
      dispatch(createUser(role, email, username, company, customerID, password, {group_id: userGroup}))
    refreshFields()
  }

  const updateGroupSubmit = () => {

    if (editGroupMode)
      dispatch(updateGroup(editGroupMode.pk, groupname, groupdescription, tagName))
    else
      dispatch(createGroup(groupname, groupdescription, tagName))
    refreshGroupFields()
  }


  const userTableData = userData(userList, deleteList, editList, activateList, groupList, roleList, detailList);
  const groupShowData = groupTableData(groupList, deleteGroupList, editGroupList);

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
                  Add Group
                </MDTypography>
              </MDBox>
              
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Group Name" fullWidth value={groupname} onChange={updateGroupName} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Group Description" fullWidth value={groupdescription} onChange={updateGroupDescription} />
                  </MDBox>
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Tag Name" fullWidth value={tagName} onChange={updateTagName} />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color={editGroupMode ? "success" : "info"} fullWidth onClick={updateGroupSubmit}>
                      {editGroupMode ? "Update" : "Add"}
                    </MDButton>
                  </MDBox>
                  <MDBox mt={1} mb={1}>
                    <MDButton variant="gradient" color="error" fullWidth onClick={refreshGroupFields}>
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
                  Group List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={groupShowData}
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
                  Add User
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel>Group</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          
                          value={userGroup}
                          
                          onChange={handleChangeUserGroup}
                          readOnly={userEditable}
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
                  <MDBox mb={1.5}>
                    <div className="select-control">
                      <FormControl sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"                          
                          value={role}
                          readOnly={userEditable}                          
                          onChange={handleChangeRole}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          {
                            roleList.map(item => <MenuItem key={Math.random()} value={item.pk}>{item.name}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="User Name" fullWidth value={username} onChange={updateName} disabled={userEditable} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Email" fullWidth value={email} onChange={updateEmail} disabled={userEditable}/>
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Company Name" value={company} onChange={updateCompany} fullWidth disabled={userEditable}/>
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Customer ID" value={customerID} onChange={updateCustomerID} fullWidth disabled={userEditable} />
                  </MDBox>

                  <MDBox mb={1.5}>
                    <MDInput type="password" label="Password" value={password} onChange={updatePassword} fullWidth  disabled={userEditable} />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color={editMode ? "success" : "info"} fullWidth onClick={updateSubmit} disabled={userEditable}>
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
                  User List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={userTableData}
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
