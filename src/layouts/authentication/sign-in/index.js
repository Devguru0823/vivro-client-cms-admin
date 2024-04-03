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

import { useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import {useNavigate} from 'react-router-dom';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// react redux
import { useDispatch } from "react-redux";
import { authLogin } from "../../../store/actions/auth";
// import * as actionTypes from "../../../store/actions/actionTypes"
const Basic = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [useremail, setUserEmail] = useState("");
  const [userpwd, setUserPwd] = useState("");

  const updateEmail = (e)=>{
    setUserEmail(e.target.value);
  }
  const updatePassword = (e)=>{
    setUserPwd(e.target.value);
  }
  const dispatch = useDispatch();
  const history = useNavigate();

  const signIn = () => {
    dispatch(authLogin(useremail, userpwd, (res)=>{
      if(res.status === 200)
        history('/dashboard')
    }))
  }

  return (
    <BasicLayout image={bgImage}>
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
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" value={useremail} onChange={updateEmail} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" value={userpwd}  onChange={updatePassword} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>

              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>

            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={signIn}>
                sign in
              </MDButton>
            </MDBox>     

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
