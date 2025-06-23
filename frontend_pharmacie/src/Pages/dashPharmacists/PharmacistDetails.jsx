import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  Breadcrumbs,
  Card,
  CardActions,
  CardOverflow,
  Avatar,
  LinearProgress,
  TabPanel,
  Tab,
  TabList,
  Tabs,
} from "@mui/joy";
import {
  HomeRounded as HomeRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  EmailRounded as EmailRoundedIcon,
  AccessTimeFilledRounded as AccessTimeFilledRoundedIcon,
  Person,
  Call,
  AdminPanelSettings,
  AssistantPhotoSharp,
  AttachMoney as AttachMoneyIcon,
  EventAvailable,
} from "@mui/icons-material";
import Badge from "./Badge";
import TBadge from "../../badge/TBagde"
import { Icon } from "@mui/material"; // Ajoutez ceci en haut si ce n'est pas déjà importé

export default function PharmacistDetails() {
  const { id } = useParams();
  const [pharmacistProfile, setPharmacistProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`http://127.0.0.1:8081/api/pharmacists/getById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => {
        setPharmacistProfile(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
        <Avatar sx={{ bgcolor: "primary.500", width: 64, height: 64, mb: 1 }} />
        <Typography level="h3" sx={{ color: "primary.700", fontWeight: 600 }}>
          Chargement des données...
        </Typography>
        <Typography level="body-md" sx={{ color: "neutral.500" }}>
          Veuillez patienter pendant le chargement des pharmaciens.
        </Typography>
        <Box sx={{ width: 200, mt: 2 }}>
          <LinearProgress color="primary" />
        </Box>
      </Box>
    );
  }

  const inputTextStyle = { color: "black" };





  // Données statiques pour tester l'affichage des sessions
  const sessions = [
    {
      sessionId: "6831e12f0bb46b28f54ef438",
      sessionDate: "2025-05-24",
      entryTime: "16:09:35.39",
      exitTime: "16:11:07.977",
      pharmacistId: "6831db790bb46b28f54ef410",
    },
    {
      sessionId: "6831e12f0bb46b28f54ef439",
      sessionDate: "2025-05-23",
      entryTime: "09:00:00.00",
      exitTime: "17:00:00.00",
      pharmacistId: "6831db790bb46b28f54ef410",
    },
    {
      sessionId: "6831e12f0bb46b28f54ef440",
      sessionDate: "2025-05-22",
      entryTime: "08:30:00.00",
      exitTime: "16:30:00.00",
      pharmacistId: "6831db790bb46b28f54ef410",
    },
    {
      sessionId: "6831e12f0bb46b28f54ef441",
      sessionDate: "2025-05-21",
      entryTime: "10:00:00.00",
      exitTime: "18:00:00.00",
      pharmacistId: "6831db790bb46b28f54ef410",
    },
      {
      sessionId: "6831e12f0bb46b28f54ef441",
      sessionDate: "2025-05-21",
      entryTime: "10:00:00.00",
      exitTime: "18:00:00.00",
      pharmacistId: "6831db790bb46b28f54ef410",
    },
  ];

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
            <Badge pharmacistProfile={pharmacistProfile} />
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
                    placeholder={pharmacistProfile.firstName}
                    disabled
                    startDecorator={<Person color="warning" />}
                    sx={{ flexGrow: 1 }}
                  />
                  <Input
                    size="sm"
                    placeholder={pharmacistProfile.lastName}
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
                    placeholder={pharmacistProfile.post}
                    startDecorator={<AdminPanelSettings color="warning" />}
                    disabled
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    size="sm"
                    startDecorator={<Call color="warning" />}
                    placeholder={pharmacistProfile.phoneNumber}
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
                    placeholder={pharmacistProfile.userName}
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
                    placeholder={pharmacistProfile.salary || "Salary"}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: pharmacistProfile.salary || "Salary",
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
                    placeholder={pharmacistProfile.address?.street || "Street details"}
                    disabled
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: pharmacistProfile.address?.street || "Street",
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>House Number</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    placeholder={pharmacistProfile.address?.houseNumber || "House Number"}
                    disabled
                    type="number"
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: pharmacistProfile.address?.houseNumber || "House Number",
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Apartment</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    type="number"
                    placeholder={pharmacistProfile.address?.apartment || "Apartment Number"}
                    disabled
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={inputTextStyle}
                    inputProps={{
                      style: inputTextStyle,
                      placeholder: pharmacistProfile.address?.apartment || "Apartment Number",
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

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
                  {(pharmacistProfile.sessions || []).map((session, idx) => {
                    // Définir la couleur selon le status
                    let borderColor = "#84ea1a"; // default
                    if (session.status === "OPEN") borderColor = "#ff9800";
                    else if (session.status === "CLOSED") borderColor = "#84ea1a";
                    else if (session.status === "AUTO_CLOSED") borderColor = "#f44336";
                    // Ajoutez d'autres statuts/couleurs si besoin

                    return (
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
                          borderLeft: `6px solid ${borderColor}`,
                        }}
                      >
                        <Box sx={{ flex: 2, minWidth: 80 }}>
                          <Typography level="title-md" sx={{ fontWeight: 600 }}>
                            {session.sessionDate}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 2, minWidth: 80 , marginLeft:'-8px'  }}>
                          <Typography level="title-md" sx={{ fontWeight: 600 }}>
                            {session.status}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: { xs: "left", sm: "center" }, mt: { xs: 1, sm: 0 } } } >
                          <Typography level="title-md" sx={{ fontWeight: 600 }}>
                            {session.entryTime.substring(0, 5)} |{" "}
                            <Typography level="title-md" sx={{ fontWeight: 600, display: "inline" }}>
                              {session.exitTime.substring(0, 5)}
                            </Typography>
                          </Typography>
                        </Box>
                      </Card>
                    );
                  })}
                </Box>
              </Stack>
            </TabPanel>
          </Tabs>
        </Card>
      </Stack>
    </Box>
  );

  


}
