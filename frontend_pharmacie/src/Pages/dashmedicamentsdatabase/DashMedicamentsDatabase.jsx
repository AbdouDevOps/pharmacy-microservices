import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SidebarMedicamentsDatabase from "./components/SidebarMedicamentsDatabase.jsx";
import HeaderMedicamentsDatabase from "./components/HeaderMedicamentsDatabase.tsx";
import theme from "../dashpayment/components/Theme.jsx";
import OrderList from "./components/OrderList.tsx";
import OrderTable from "./components/OrderTable.tsx";
import Details from "./filter/Details.tsx";

export default function DashMedicamentsDatabase() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", maxHeight: "100dvh" }}>
        <HeaderMedicamentsDatabase />
        <SidebarMedicamentsDatabase />
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
              <Typography
                color="warning"
                sx={{ fontWeight: 500, fontSize: 12 }}>
                MedicamentsDatabase
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
          </Box>
           <Details />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
