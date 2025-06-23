import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import logo from "../../../Images/logo.png";
import imgProfile from "../../../Images/profile.png";
import { AccountBalance, BarChartOutlined, Domain, Engineering, Group, Inventory, Message, SettingsSuggest, Vaccines, Warning } from "@mui/icons-material";
import { Link } from "react-router-dom";



function Toggler({ defaultExpanded = true, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}>
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function SidebarUpdateProf() {



     const [adminProfile, setAdminProfile] = React.useState({});
      const [imageProfile, setImageProfile] = React.useState("");
    
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Aucun token trouvé. Veuillez vous connecter.");
          setLoading(false);
          return;
        }
        fetch("http://127.0.0.1:8081/api/pharmacists/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données");
            }
            return response.json();
          })
          .then((data) => {
            setAdminProfile(data);
            setLoading(false);
            console.log(data);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
            setLoading(false);
          });
      }, []);
  
  
      const rol = adminProfile.post ;

  if (loading || !adminProfile || Object.keys(adminProfile).length === 0) {
    return null;
  }

  if (rol === "Pharmacist"  ||   rol === "Pharmacisct_Assistant"  ) {
  return (
    <>
      <CssBaseline />
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}>
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "260px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img src={logo} alt="" style={{ width: "80%" }} />
        </Box>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}>
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}>


            <ListItem>
              <ListItemButton component={Link} to="/dashMedicament"  >
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <ListItemButton>
                    Medicament
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>


            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}  >
                    <GroupRoundedIcon/>
                    <ListItemContent>
                      <Typography level="title-sm">Users</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }} component={Link} to="/dashprofile">
                    <ListItemButton>
                      Profil
                    </ListItemButton>
                  </ListItem>

                  <ListItem sx={{ mt: 0.5 }} component={Link} to="/dashupdateprofile">
                    <ListItemButton >
                      Update Profil
                    </ListItemButton>
                  </ListItem>


                </List>
              </Toggler>
            </ListItem>

            
          </List>
          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}>

          </List>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar variant="outlined" size="sm" src={adminProfile.badge.image} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {adminProfile.firstName} {adminProfile.lastName}.
            </Typography>
            <Typography level="body-xs">{adminProfile.userName}</Typography>
          </Box>
        </Box>
      </Sheet>
    </>
  );
  }

  return (
    <>
      <CssBaseline />
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}>
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "260px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img src={logo} alt="" style={{ width: "80%" }} />
        </Box>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}>
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}>
            <ListItem >
              <ListItemButton component={Link} to="/dashInventory" selected> 
                <Inventory color="warning" />
                <ListItemContent>
                  <ListItemButton role="menuitem" >
                    Inventory
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={Link} to="/dashMedicamentsDatabase" >
                <Vaccines  />
                <ListItemContent>
                  <ListItemButton role="menuitem" >
                    Medicaments database
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={Link} to="/dashMedicament"  >
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <ListItemButton>
                    Medicament
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>


            <ListItem>
              <ListItemButton component={Link} to="/dashAleartInventory"  >
                <Warning />
                <ListItemContent>
                  <ListItemButton role="menuitem"  >
                    Aleart Inventory
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>




            <ListItem>
              <ListItemButton  component={Link} to="/dashpharmacists" >
                <Group />
                <ListItemContent>
                  <ListItemButton role="menuitem" >
                    Pharmacists
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>



            <ListItem>
              <ListItemButton component={Link} to="/dashnotification" >
                <Message />
                <ListItemContent>
                  <ListItemButton role="menuitem" >
                    Sessions Notification
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
    


            <ListItem>
              <ListItemButton component={Link} to="/dashstatistiques" >
                <BarChartOutlined />
                  <ListItemButton role="menuitem"  >
                  Statistics
                </ListItemButton>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}  >
                    <GroupRoundedIcon/>
                    <ListItemContent>
                      <Typography level="title-sm">Users</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }} component={Link} to="/dashprofile">
                    <ListItemButton>
                      Profil
                    </ListItemButton>
                  </ListItem>

                  <ListItem sx={{ mt: 0.5 }} component={Link} to="/dashupdateprofile">
                    <ListItemButton >
                      Update Profil
                    </ListItemButton>
                  </ListItem>

              <ListItemButton > 
                  <ListItem component={Link} to="/dashaddadmin" >
                    <ListItemButton role="menuitem" sx={{ ml:'-76px'}} >
                      Add Pharmacist
                    </ListItemButton>
                  </ListItem>
              </ListItemButton>
                </List>
              </Toggler>
            </ListItem>

            
          </List>
          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}>

          </List>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar variant="outlined" size="sm" src={adminProfile.badge.image} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {adminProfile.firstName} {adminProfile.lastName}.
            </Typography>
            <Typography level="body-xs">{adminProfile.userName}</Typography>
          </Box>
        </Box>
      </Sheet>
    </>
  );
  }