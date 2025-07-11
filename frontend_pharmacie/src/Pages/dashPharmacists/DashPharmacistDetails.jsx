import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SidebarPharmacists from "./components/SidebarPharmacists.jsx";
import HeaderPharmacists from "./components/HeaderPharmacists.tsx";
import OrderTable from "./components/OrderTable.tsx";
import { Token } from "@mui/icons-material";
import PharmacistDetails from "./PharmacistDetails.jsx";

import theme from "../dashpayment/components/Theme.jsx"
import { Link } from "react-router-dom";


export default function DashPharmacistDetails() {


  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: "flex", minHeight: "100dvh" , overflow:"scroll" }}>
        <HeaderPharmacists />
        <SidebarPharmacists />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}>
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home">
                <HomeRoundedIcon />
              </Link>{" "}
              <Typography sx={{ fontWeight: 500, fontSize: 12 }}>
                Home
              </Typography>
              <Link to="/dashpharmacists"> 

              <Typography
                color="neutral"
                sx={{ fontWeight: 500, fontSize: 12 }}>
                Pharmacists
              </Typography>
                            </Link>

              <Typography
                color="warning"
                sx={{ fontWeight: 500, fontSize: 12 }}>
                Pharmacists Details
              </Typography>

            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}>
            <Typography level="h2" component="h1">
              Pharmacists
            </Typography>
          </Box>
          <PharmacistDetails />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
