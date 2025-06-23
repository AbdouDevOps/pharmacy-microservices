import * as React from "react";
import { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DropZone from "./DropZone";
import CountrySelector from "./CountrySelector";
import EditorToolbar from "./EditorToolbar";
import { Link } from "react-router-dom";
import {
  AdminPanelSettings,
  AssistantPhotoSharp,
  Call,
  EventAvailable,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";
import logo from "../../../Images/profile.png";
import { Autocomplete, LinearProgress } from "@mui/material";
import {customFetch} from "../../../api/api"
import profil from "../../../Images/profile.png"


import Badge from '../../dashPharmacists/Badge'
import {
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
    AttachMoney as AttachMoneyIcon,
  
  Cancel,
} from "@mui/icons-material";
import Avatar from "@mui/joy/Avatar";
import { TabPanel } from "@mui/joy";
import UpdatePasswordModal from "./UpdatePasswordModal";
import UpdatePharmacistPasswordModal from "./UpdatePharmacistPasswordModal";

export default function MyProfile() {
      const [adminProfile, setAdminProfile] = React.useState({});
      const [imageProfile, setImageProfile] = React.useState("");
      const [isUpdatePasswordOpenModal, setIsUpdatePasswordOpenModal] = useState(false);
      const [isUpdatePharmacistPasswordOpenModal, setIsUpdatePharmacistPasswordOpenModal] = useState(false);

    
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token)

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
  
  
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.500",
            width: 64,
            height: 64,
            mb: 1,
            boxShadow: 3,
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.7)" },
              "70%": { boxShadow: "0 0 0 16px rgba(25, 118, 210, 0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 36, color: "#fff" }} />
        </Avatar>
        <Typography level="h3" sx={{ color: "primary.700", fontWeight: 600 }}>
          Chargement des données...
        </Typography>
        <Typography level="body-md" sx={{ color: "neutral.500" }}>
          Veuillez patienter pendant le chargement des pharmaciens.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#1976d2"
              strokeWidth="4"
              strokeDasharray="100"
              strokeDashoffset="60"
              strokeLinecap="round"
              style={{
                animation: "dash 1.2s linear infinite",
              }}
            />
            <style>
              {`
                @keyframes dash {
                  0% { stroke-dashoffset: 100; }
                  100% { stroke-dashoffset: 0; }
                }
              `}
            </style>
          </svg>
        </Box>
      </Box>
    );
  }




  
  const inputTextStyle = { color: "black" };

  return (

      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
          width: "100%",
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Badge pharmacistProfile={adminProfile} />
          </Box>
          <Divider />

          <Stack direction="row" spacing={3} sx={{ my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* Name */}
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Input
                    size="sm"
                    placeholder={adminProfile.firstName}
                    disabled
                    startDecorator={<Person color="warning" />}
                    sx={{ flexGrow: 1 }}
                  />
                  <Input
                    size="sm"
                    placeholder={adminProfile.lastName}
                    disabled
                    sx={{ flexGrow: 1 }}
                    startDecorator={<Person color="warning" />}
                  />
                </FormControl>
              </Stack>

              {/* Role & Phone */}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input
                    size="sm"
                    placeholder={adminProfile.post}
                    startDecorator={<AdminPanelSettings color="warning" />}
                    disabled
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    size="sm"
                    startDecorator={<Call color="warning" />}
                    placeholder={adminProfile.phoneNumber}
                    disabled
                  />
                </FormControl>
              </Stack>

              {/* Email & Salary */}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    startDecorator={<EmailRoundedIcon color="warning" />}
                    placeholder={adminProfile.userName}
                    disabled
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Salary</FormLabel>
                  <Input
                    size="sm"
                    type="number"
                    color="warning"
                    disabled
                    startDecorator={<AttachMoneyIcon color="warning" />}
                    placeholder={adminProfile.salary || "Salary"}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: adminProfile.salary || "Salary",
                    }}
                  />
                </FormControl>
              </Stack>

              {/* Timezone */}
              <FormControl>
                <FormLabel>Timezone</FormLabel>
                <Input
                  size="sm"
                  sx={{ flexGrow: 1 }}
                  startDecorator={<AccessTimeFilledRoundedIcon color="warning" />}
                  placeholder={"Morocco Time (Casablanca)  — GMT+01:00 "}
                  disabled
                />
              </FormControl>

              {/* Address */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ marginTop: 2 }}
              >
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Street</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    placeholder={adminProfile.address?.street || "Street details"}
                    disabled
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: adminProfile.address?.street || "Street",
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>House Number</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    placeholder={adminProfile.address?.houseNumber || "House Number"}
                    disabled
                    type="number"
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: adminProfile.address?.houseNumber || "House Number",
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Apartment</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    type="number"
                    placeholder={adminProfile.address?.apartment || "Apartment Number"}
                    disabled
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: adminProfile.address?.apartment || "Apartment Number",
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
                    {/* Card Actions */}
                    <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                      <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                        {adminProfile.post === "Head_Pharmacist" && (
                          <Button size="sm" variant="solid" sx={{bgcolor:"red"}} onClick={() => setIsUpdatePharmacistPasswordOpenModal(true)}>
                          update Pharmacist Password
                        </Button>
                        )}
                        <Button size="sm" variant="solid"  onClick={() => setIsUpdatePasswordOpenModal(true)}>
                          update Password
                        </Button>
                        
                        {isUpdatePasswordOpenModal && (
                      <UpdatePasswordModal
                        open={isUpdatePasswordOpenModal}
                        onClose={() => setIsUpdatePasswordOpenModal(false)}
                        data={adminProfile}
                      />
                        )}
                        {isUpdatePharmacistPasswordOpenModal && (
                          <UpdatePharmacistPasswordModal
                            open={isUpdatePharmacistPasswordOpenModal}
                            onClose={() => setIsUpdatePharmacistPasswordOpenModal(false)}
                            data={adminProfile}
                          />
                        )}
                      </CardActions>
                    </CardOverflow>

          {/* Actions */}

          <Tabs
            size="lg"
            sx={{
              // Change underline color for selected tab
              '& .MuiTabs-indicator': {
                backgroundColor: '#84ea1a', // your custom color
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <TabList>
              <Tab
                variant="plain"
                sx={{
                  '&.Mui-selected, &[aria-selected="true"]': {
                    backgroundColor: "#e3fbfd",
                    color: "black",
                  },
                }}
              >
                <EventAvailable color="warning" />
                Sessions
              </Tab>
            </TabList>
            <TabPanel>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {adminProfile.sessions.map((session, idx) => (
                    <Card
                      key={session.sessionId}
                      variant="outlined"
                      sx={{
                        flex: "1 1 calc(50% - 16px)",
                        minWidth: "300px",
                        maxWidth: "calc(50% - 16px)",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        borderRadius: 3,
                        background: "#fafdff",
                        borderLeft: `6px solid #84ea1a`,
                      }}
                    >
                      <Box sx={{ flex: 2, minWidth: 120 }}>
                        <Typography level="title-md" sx={{ fontWeight: 600 }}>
                          {session.sessionDate}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: { xs: "left", sm: "center" }, mt: { xs: 1, sm: 0 } }}>
                        <Typography level="title-md" sx={{ fontWeight: 600 }}>
                          {session.entryTime.substring(0, 5)} |{" "}
                          <Typography level="title-md" sx={{ fontWeight: 600, display: "inline" }}>
                            {session.exitTime.substring(0, 5)}
                          </Typography>
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Stack>
            </TabPanel>
          </Tabs>
        </Card>
      </Stack>
    </Box>
  );
}
