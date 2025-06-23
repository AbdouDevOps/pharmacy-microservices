import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Autocomplete,
  TextField,
  Input,
} from "@mui/joy";
import axios from "axios";
import { Pill } from "lucide-react";
import {medicament_data} from '../../dashmedicamentsdatabase/data/medicament'

const ModalAddMedicamentLot = ({ open, onClose }) => {
  const [medicineName, setMedicineName] = useState(null);
  const [composition, setComposition] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [adminProfile, setAdminProfile] = useState({});

  // Set entry date when modal opens
  useEffect(() => {
    if (open) {
      const today = new Date();
      setEntryDate(today.toISOString().split('T')[0]);
    }
  }, [open]);


const medicamentOptions = medicament_data.map((medicament) => ({
  label: medicament.Composition,
  fullData: medicament,
}));


const handleSubmit = async (e) => {
  e.preventDefault();
  // Remove setting entryDate here; set it when modal opens or component mounts
  const expiration = new Date(expirationDate);
  const today = new Date();
  const newLot = {
      name: medicineName?.label || "",
      entryDate : entryDate,
      expirationDate  : expirationDate,
      quantity : updatedQuantity,
  };


  const token = localStorage.getItem("token");


  {/**  try {
    const response = await axios.post(
      "http://localhost:8081/api/medicaments/lots/add-medicament-in-lot",
      newLot,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data);
    window.location.reload();
  } catch (error) {
    console.error("Error submitting data:", error);
  }
     */}


     console.log(newLot);

};


  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{width:'500px'}}>
        <Box
          component="form"
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
<FormControl>
  <FormLabel>Médicament (Composition)</FormLabel>
  <Autocomplete
    value={medicineName}
    onChange={(event, newValue) => {
      setMedicineName(newValue);
      setComposition(newValue?.fullData?.Composition || "");
    }}
    options={medicamentOptions}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => <TextField {...params} label="Sélectionner un médicament" />}
  />
</FormControl>

<FormControl>
  <FormLabel>Entry Date</FormLabel>
  <Input
    type="date"
    value={entryDate}
    onChange={(e) => setEntryDate(e.target.value)}
    fullWidth
    disabled // Optional: disable if you don't want users to edit
  />
</FormControl>



          <FormControl>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              fullWidth
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}
        >
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalAddMedicamentLot;
