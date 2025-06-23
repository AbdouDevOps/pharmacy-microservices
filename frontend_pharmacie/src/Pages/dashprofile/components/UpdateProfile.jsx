import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// MUI Joy UI
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { Alert, Avatar, Checkbox, Chip, Modal, ModalClose, ModalDialog } from "@mui/joy";

// MUI Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Call, Camera, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AddPharmacistModal from "./AddPharmacistModal";
import { SearchIcon } from "lucide-react";

export default function MyProfile() {
  // State
  const [adminProfile, setAdminProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartment, setApartment] = useState("");
  const [password, setPassword] = useState(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rolePharmacist, setRolePharmacist] = useState("");
  const [isAddPharmaacistOpenModal, setIsAddPharmaacistOpenModal] = useState(false);
  const [pharmacistFinalData, setPharmacistFinalData] = useState({});
  const [preview, setPreview] = React.useState(null);
  const [badgeImage, setBadgeImage] = useState(null);





React.useEffect(() => {
  if (adminProfile && Object.keys(adminProfile).length > 0) {
    setFirstName(adminProfile.firstName || "");
    setLastName(adminProfile.lastName || "");
    setEmail(adminProfile.userName || "");
    setPhoneNumber(adminProfile.phoneNumber || "");
    setSalary(adminProfile.salary || "");
    setStreet(adminProfile.address?.street || "");
    setHouseNumber(adminProfile.address?.houseNumber || "");
    setApartment(adminProfile.address?.apartment || "");
    setRolePharmacist(adminProfile.roles ? { roles: adminProfile.roles } : "");

    // Ajoute d'autres champs si besoin
  }
}, [adminProfile]);




  const handleSubmit = async () => {

    const data = {
      firstName : firstName,
      lastName : lastName,
      userName : login,
      phoneNumber : phoneNumber,
      address: {
        street: street,
        houseNumber: houseNumber,
        apartment: apartment,
      },
    };


try{

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/pharmacists/updateProfile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred while updating the profile.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
    


      

  };



  // Roles
  const pharmacyRoles = [
    "Pharmacist",
    "Pharmacist_Assistant",
    "Head_Pharmacist",
  ];
  const inputTextStyle = { color: "black" };
  
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
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
            setLoading(false);
          });
      }, []);
    


  // Handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();


  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const handleUpdateConfirm = () => {
    handleSubmit();
  }

  const handleDeleteCancel = () => {
    setIsUpdateModal(false);
  }


    // Loading state
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

  // Render
  return (
    <>
          <Modal open={isUpdateModal} onClose={handleDeleteCancel}>
            <ModalDialog aria-labelledby="delete-modal" sx={{ width: 400 }}>
              <ModalClose />
              <Typography level="h2" id="delete-modal" sx={{ mb: 2 }}>
                Are you sure you want to delete this resident ?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" color="neutral" onClick={handleDeleteCancel}>
                  Cancel
                </Button>
                <Button color="warning" onClick={handleUpdateConfirm}>
                  Confirm
                </Button>
              </Box>
            </ModalDialog>
          </Modal>
     
    <Box sx={{ flex: 1, width: "100%" }}>
      {/* Breadcrumbs and Title */}
      <Box sx={{
        position: "sticky",
        top: { sm: -100, md: -110 },
        bgcolor: "background.body",
        zIndex: 9995,
      }}>
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}>
            <Link underline="none" color="neutral" to="/" aria-label="Home" component={Link}>
              <HomeRoundedIcon />
            </Link>
            <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Home</Typography>
            <Typography color="warning" sx={{ fontWeight: 500, fontSize: 12 }}>
              Update profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Update profile
          </Typography>
        </Box>
      </Box>

      {/* Main Card */}
      <Stack spacing={4} sx={{
        display: "flex",
        maxWidth: "800px",
        mx: "auto",
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 },
      }}>
        <Card>
          {/* Personal Info */}
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the networks.
            </Typography>
          </Box>
          <Divider />


          {/* Form Fields */}
          <Stack direction="row" spacing={3} sx={{ my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* Name */}
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}>
                  <Input
                    size="sm"
                    color="warning"
                    value={firstName}
                    placeholder={adminProfile.firstName || "First name"}
                    required
                    startDecorator={<Person color="warning" />}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    onChange={(e) => setFirstName(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.firstName || "First name" }}
                  />
                  <Input
                    required
                    size="sm"
                    color="warning"
                    placeholder={adminProfile.lastName || "Last name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    startDecorator={<Person color="warning" />}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.lastName || "Last name" }}
                  />
                </FormControl>
              </Stack>

              {/* Phone & Salary */}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    size="sm"
                    type="tel"
                    color="warning"
                    required
                    startDecorator={<Call color="warning" />}
                    placeholder={adminProfile.phoneNumber || "Phone Number"}
                    sx={{ ...inputTextStyle }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.phoneNumber || "Phone Number" }}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }} >
                  <FormLabel>Salary</FormLabel>
                  <Input
                    disabled
                    size="sm"
                    type="number"
                    color="warning"
                    required
                    startDecorator={<AttachMoneyIcon color="warning" />}
                    placeholder={adminProfile.salary || "Salary"}
                    sx={{ ...inputTextStyle }}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.salary || "Salary" }}
                  />
                </FormControl>
              </Stack>

              {/* Login */}
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Login</FormLabel>
                  <Input
                    size="sm"
                    type="login"
                    color="warning"
                    value={login}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    startDecorator={<EmailRoundedIcon color="warning" />}
                    placeholder={adminProfile.userName || "Login"}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.userName || "Login" }}
                  />
                </FormControl>
              </Stack>

              {/* Address */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Street</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    placeholder={adminProfile.address.street || "Street details"}
                    value={street}
                    required
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={{ ...inputTextStyle }}
                    onChange={(e) => setStreet(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.address.street  || "Street" }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>House Number</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    placeholder={adminProfile.address.houseNumber || "House Number"}
                    value={houseNumber }
                    required
                    type="number"
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={{ ...inputTextStyle }}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.address.houseNumber || "House Number" }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Apartment</FormLabel>
                  <Input
                    size="sm"
                    color="warning"
                    type="number"
                    placeholder={adminProfile.address.apartment || "Apartment Number"}
                    value={apartment}
                    required
                    startDecorator={<HomeRoundedIcon color="warning" />}
                    sx={{ ...inputTextStyle }}
                    onChange={(e) => setApartment(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: adminProfile.address.apartment || "Apartment Number" }}
                  />
                </FormControl>
              </Stack>

              <Divider />

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <FormLabel sx={{ minWidth: 80 }}>Roles</FormLabel>
                <Stack direction="row" spacing={2}>
                  <Chip color="warning" sx={{ fontSize: "14px" , color:'black' , padding: '8px' , borderRadius: '8px' ,  }}>
                    {adminProfile.post}
                  </Chip>  
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* Close the missing Box here */}

          {/* Card Actions */}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid"  onClick={()=> setIsUpdateModal(true)}>
                Save
              </Button>
              

              {isAddPharmaacistOpenModal && (
                <AddPharmacistModal
                  open={isAddPharmaacistOpenModal}
                  onClose={() => setIsAddPharmaacistOpenModal(false)}
                  data={pharmacistFinalData}
                />
              )}

            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
    </>





  );
}
