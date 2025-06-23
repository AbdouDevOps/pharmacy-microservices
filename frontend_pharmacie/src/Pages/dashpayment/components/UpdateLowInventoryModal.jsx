import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Alert,
} from "@mui/joy";
import { Pill } from "lucide-react";

const UpdateLowInventoryModal = ({ open, onClose, name, quantity }) => {
  const [entryDate, setEntryDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      const today = new Date();
      setEntryDate(today.toISOString().split('T')[0]);
      setExpirationDate("");
      setUpdatedQuantity(0);
      setError("");
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !entryDate ||
      !expirationDate ||
      !updatedQuantity ||
      updatedQuantity <= 0
    ) {
      setError("All fields are required and quantity must be greater than 0.");
      return;
    }
    setError("");
    // ... sending logic
    console.log({
      name : name,
      entryDate : entryDate,
      expirationDate  : expirationDate,
      quantity : updatedQuantity,
    });

    const newLot = {
      name: name,
      entryDate: entryDate,
      expirationDate: expirationDate,
      quantity: updatedQuantity,
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
     */}  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: '500px' }}>
        <Box
          component="form"
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {error && (
            <Alert sx={{bgcolor:'red' , color:'white'}} variant="soft">
              {error}
            </Alert>
          )}
          <FormControl>
            <FormLabel>Medicine (Composition)</FormLabel>
            <Input
              placeholder={name}
              disabled
              fullWidth
              startDecorator={<Pill />}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Current Quantity</FormLabel>
            <Input
              type="number"
              value={quantity}
              placeholder={quantity}
              fullWidth
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel>Updated Quantity</FormLabel>
            <Input
              type="number"
              value={updatedQuantity}
              onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Entry Date</FormLabel>
            <Input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              fullWidth
              disabled
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

export default UpdateLowInventoryModal;
