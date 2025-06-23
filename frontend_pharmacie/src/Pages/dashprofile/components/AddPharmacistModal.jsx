import React from "react";
import { Box, Button, Modal, ModalDialog, Typography } from "@mui/joy";
import TBadge from '../../../badge/TBagde'
import { useState } from "react";
import axios from "axios";

export default function AddPharmacistModal({ open, onClose, data }) {
  console.log(data)

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/pharmacists/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        
      console.log(response.data);
    } catch (err) {
console.log(err)
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        size="sm"
        aria-labelledby="add-pharmacist-modal-title"
        aria-describedby="add-pharmacist-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only("xs")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
          },
        })}>
        <Typography id="add-pharmacist-modal-title" level="h2">
          Add a Pharmacist
        </Typography>
        <Box id="add-pharmacist-modal-description" textColor="text.tertiary">
          <TBadge pharmacistProfile={data} />
          <Typography mt={1}>
            Please confirm the addition of a new pharmacist to the platform.
          </Typography>
          <Typography mt={2}>
            This action will add a new pharmacist to your list. Make sure the information is correct before proceeding.
          </Typography>
          <Typography mt={2} color="warning" fontWeight="bold">
            Do you really want to add this pharmacist?
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
          <Button variant="solid" color="primary" onClick={()=> handleSubmit() }>
            Confirm
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
