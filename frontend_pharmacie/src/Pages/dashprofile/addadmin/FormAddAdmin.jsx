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
import { Call, Camera, Visibility, VisibilityOff } from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Alert, Checkbox } from "@mui/joy";

import { Link } from "react-router-dom";
import {
  AdminPanelSettings,
  Password,
  PasswordSharp,
  Person,
} from "@mui/icons-material";
import axios from "axios";
import AddPharmacistModal from "../components/AddPharmacistModal";

export default function MyProfile() {
  const [newPharmacist, setAdminProfile] = useState({});
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






  const handleSubmit = async () => {
      if (
        !firstName ||
        !lastName ||
        !login ||
        !phoneNumber ||
        !salary ||
        !street ||
        !houseNumber ||
        !apartment ||
        !password ||
        !rolePharmacist
      ) {
        setError("Veuillez remplir tous les champs et sélectionner un rôle.");
        return;
      }




      const data = {
        "firstName": firstName,
        "lastName": lastName,
        "userName": login,
        "password": password,
        "phoneNumber": phoneNumber,
        "salary": salary,
        "roles": rolePharmacist.roles ? rolePharmacist.roles[0] : "",
        "address": {
            "street": street,
            "houseNumber": houseNumber,
            "apartment": apartment
        },
        "badge" : {
          "badgeId" : "53096995",
          "image" : badgeImage,
          "dateAssigned" : new Date().toLocaleString()
        },
        "sessionStatus": false
      };

      const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("userName", login);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("salary", salary);
        formData.append("post", rolePharmacist.roles ? rolePharmacist.roles[0] : "");

  // Ajoutez les champs imbriqués (comme "address")
  formData.append("address.street", street);
  formData.append("address.houseNumber", houseNumber);
  formData.append("address.apartment", apartment);

  // Ajoutez les champs imbriqués (comme "badge")
  formData.append("badge.badgeId", "53096995"); // Exemple statique
  formData.append("badge.dateAssigned", new Date().toISOString());


  if (badgeImage) {
    formData.append("badgeImage", badgeImage); // Le fichier image
  }
      setPharmacistFinalData(formData);
      setIsAddPharmaacistOpenModal(true);
  };



  // Roles
  const pharmacyRoles = [
    "Pharmacist",
    "Pharmacist_Assistant",
    "Head_Pharmacist",
  ];
  const inputTextStyle = { color: "black" };
  
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8081/api/pharmacists/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setAdminProfile(data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);
    


  // Handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();


const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);    // Met à jour l'URL de preview
    setBadgeImage(file);     // Garde le fichier pour l'envoi
  }
};


  // Render
  return (
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
              Add Pharmacist
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Add Pharmacist
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
          {/* Add Pharmacist Info */}
          <Box sx={{ mb: 1 }}>
            <Typography level="body-sm">
              Fill out the form below to add a new pharmacist to your network.
            </Typography>
          </Box>
          <Divider />

                    {/* Error Alert */}
                    {error && (
                      <Box sx={{ my: 2 }}>
                        <Alert sx={{backgroundColor:"#E40B0B" , color:'white'}} variant="soft">
                          {error}
                        </Alert>
                      </Box>
                    )}
          

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
                    placeholder={newPharmacist.firstName || "First name"}
                    value={firstName}
                    required
                    startDecorator={<Person color="warning" />}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    onChange={(e) => setFirstName(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: newPharmacist.firstName || "First name" }}
                  />
                  <Input
                    required
                    size="sm"
                    color="warning"
                    placeholder={newPharmacist.lastName || "Last name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    startDecorator={<Person color="warning" />}
                    inputProps={{ style: inputTextStyle, placeholder: newPharmacist.lastName || "Last name" }}
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
                    placeholder={newPharmacist.phoneNumber || "Phone Number"}
                    sx={{ ...inputTextStyle }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: newPharmacist.phoneNumber || "Phone Number" }}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Salary</FormLabel>
                  <Input
                    size="sm"
                    type="number"
                    color="warning"
                    required
                    startDecorator={<AttachMoneyIcon color="warning" />}
                    placeholder={newPharmacist.salary || "Salary"}
                    sx={{ ...inputTextStyle }}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    inputProps={{ style: inputTextStyle, placeholder: newPharmacist.salary || "Salary" }}
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
                    placeholder={newPharmacist.userName || "Login"}
                    inputProps={{ style: inputTextStyle, placeholder: newPharmacist.userName || "Login" }}
                  />
                </FormControl>
              </Stack>

              {/* Password */}
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    size="sm"
                    type={showPassword ? "text" : "password"}
                    color="warning"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ flexGrow: 1, ...inputTextStyle }}
                    startDecorator={<VpnKeyIcon color="warning" />}
                    placeholder="************"
                    required
                    inputProps={{ style: inputTextStyle, placeholder: "Enter new password" }}
                    endDecorator={
                      <IconButton
                        variant="text"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ pointerEvents: "auto" }}>
                        {showPassword ? (
                          <VisibilityOff color="warning" />
                        ) : (
                          <Visibility color="warning" />
                        )}
                      </IconButton>
                    }
                  />
                </FormControl>
              </Stack>

             { /* Address */}
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ marginTop: 2 }}>
                      <FormControl sx={{ flex: 1 }}>
                        <FormLabel>Street</FormLabel>
                        <Input
                        size="sm"
                        color="warning"
                        placeholder={newPharmacist.street || "Street details"}
                        value={street}
                        required
                        startDecorator={<HomeRoundedIcon color="warning" />}
                        sx={{ ...inputTextStyle }}
                        onChange={(e) => setStreet(e.target.value)}
                        inputProps={{ style: inputTextStyle, placeholder: newPharmacist.street || "Street" }}
                        />
                      </FormControl>
                      <FormControl sx={{ flex: 1 }}>
                        <FormLabel>House Number</FormLabel>
                        <Input
                        size="sm"
                        color="warning"
                        placeholder={newPharmacist.houseNumber || "House Number"}
                        value={houseNumber}
                        required
                        type="number"
                        startDecorator={<HomeRoundedIcon color="warning" />}
                        sx={{ ...inputTextStyle }}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        inputProps={{ style: inputTextStyle, placeholder: newPharmacist.houseNumber || "House Number" }}
                        />
                      </FormControl>
                      <FormControl sx={{ flex: 1 }}>
                        <FormLabel>Apartment</FormLabel>
                        <Input
                        size="sm"
                        color="warning"
                        type="number"
                        placeholder={newPharmacist.apartment || "Apartment Number"}
                        value={apartment}
                        required
                        startDecorator={<HomeRoundedIcon color="warning" />}
                        sx={{ ...inputTextStyle }}
                        onChange={(e) => setApartment(e.target.value)}
                        inputProps={{ style: inputTextStyle, placeholder: newPharmacist.apartment || "Apartment Number" }}
                        />
                      </FormControl>
                      </Stack>

                      <Divider />

                      {/* Profile Picture */}
                      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                      <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Profile picture</FormLabel>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="outlined"
                          size="sm"
                          color="warning"
                          sx={{
                          minWidth: 0,
                          px: 1,
                          py: 0.5,
                          fontSize: 12,
                          ml: 0,
                          borderColor: "warning.main",
                          '&:hover': {
                            backgroundColor: "warning.light",
                            borderColor: "warning.dark",
                          },
                          }}
                          component="label"
                          startDecorator={<Camera color="warning" />}
                        >
                          Browse
                          <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleFileChange}
                          />
                        </Button>
                        {isUploading && (
                          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                          <svg width="28" height="28" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#f59e42">
                            <g fill="none" fillRule="evenodd">
                            <g transform="translate(1 1)" strokeWidth="2">
                              <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                              <path d="M36 18c0-9.94-8.06-18-18-18">
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"
                              />
                              </path>
                            </g>
                            </g>
                          </svg>
                          <Typography sx={{ ml: 1 }} level="body-sm">
                            Loading...
                          </Typography>
                          </Box>
                        )}
                        </Box>
                        {preview && !isUploading && (
                        <Box sx={{ mt: 1 }}>
                          <Typography level="body-sm">Preview:</Typography>
                          <img
                          src={preview}
                          alt="Preview"
                          style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                          />
                        </Box>
                        )}
                      </FormControl>
                      </Stack>



                      {/* Roles */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <FormLabel sx={{ minWidth: 80 }}>Roles</FormLabel>
                <Stack direction="row" spacing={2}>
                  {pharmacyRoles.map((role) => (
                    <FormControl key={role} sx={{ flexDirection: "row", alignItems: "center" }}>
                      <Checkbox
                        checked={rolePharmacist.roles?.[0] === role}
                        color="warning"
                        onChange={() => {
                        setRolePharmacist((prev) => ({
                            ...prev,
                            roles: [role],
                          }));
                        }}
                        value={rolePharmacist}
                        style={{ marginRight: 6 }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <Typography variant="body2" style={{ color: "rbg(0,0,0)" }}>{role}</Typography>
                    </FormControl>
                  ))}
                </Stack>




              </Stack>
            </Stack>
          </Stack>






          {/* Card Actions */}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid"  onClick={handleSubmit}>
                Save
              </Button>
              {error && (
                <Box sx={{ color: "red", fontSize: "14px", textAlign: "center", mt: 2 }}>
                  <Typography>{error}</Typography>
                </Box>
              )}
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
  );
}
