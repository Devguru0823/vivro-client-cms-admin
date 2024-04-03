
import { useRef, useState } from "react";

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
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { useSelector, useDispatch } from "react-redux";

// Data
import tableData from "./data/tableData";

// Redux Stuff
import { createSystem, deleteSystem, updateSystem } from "../../store/actions/systems";

const defaultImg = require("../../assets/images/mark-icon.jpg");

const Comp = () => {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.dashboard.systems)
  const [editMode, setEditMode] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [uploadFile, setUploadFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(defaultImg)
  
  const refreshFields = () => {
    setEditMode(null);
    setName("");
    
    setDescription("");
    setPreviewUrl(defaultImg)
    setUploadFile(null)
  }

  const deleteList = (id) => {
    dispatch(deleteSystem(id));
    refreshFields();
  }

  const editList = (i) => {
    const item = list[i]
    setPreviewUrl(item.logo_img)
    setEditMode(item)
    setName(item.name)
    setDescription(item.description);
  }

  const showData = tableData(list, deleteList, editList);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const updateSubmit = () => {
    if (editMode)
      dispatch(updateSystem(editMode.pk, name, description, uploadFile));
    else
      dispatch(createSystem(name, description, uploadFile));
    refreshFields();
  }

  const setSelectedFile = (file) => {
    if (file) {
      setUploadFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setUploadFile(null)
      setPreviewUrl(defaultImg)
    }
  }

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  }
  const inputFileRef = useRef(null)

  const openUploadImg = (e) => {
    e.preventDefault();
    inputFileRef.current.click()
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={1} className="systems">
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
                  Add System
                </MDTypography>
              </MDBox>

              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox display="flex" alignItems="center" lineHeight={1} mb={2} className="logo-image" onClick={openUploadImg}>
                    <MDAvatar src={previewUrl} name="Logo Image" size="lg" shadow="sm" />
                    <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={2}>
                      &nbsp;&nbsp;&nbsp; Logo Image
                    </MDTypography>
                  </MDBox>
                  <input
                    type="file"
                    ref={inputFileRef}
                    onChange={onSelectFile}
                  />
                  <MDBox mb={1.5}>
                    <MDInput type="text" label="Name" fullWidth value={name} onChange={updateName} />
                  </MDBox>

                  <MDBox mb={1.5}>
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
                  System List
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
