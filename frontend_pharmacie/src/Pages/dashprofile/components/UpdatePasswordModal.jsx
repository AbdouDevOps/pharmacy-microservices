import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Input,
  IconButton,
} from "@mui/joy";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const UpdatePasswordModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isDisabled = !username || !oldPassword || !newPassword;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const data = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/pharmacists/resetPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ backdropFilter: "blur(6px)" }}>
      <ModalDialog
        size="sm"
        sx={(theme) => ({
          p: 0,
          overflow: "hidden",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.18)",
          minWidth: 500,
          [theme.breakpoints.only("xs")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
            minWidth: "unset",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            background: "rgba(255,255,255,0.7)",
            borderBottom: "1px solid #e0e0e0",
            backdropFilter: "blur(2px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LockIcon color="warning" sx={{ fontSize: 28 }} />
            <Typography level="h4" fontWeight={700}>
              Update Password
            </Typography>
          </Box>
          <IconButton variant="plain" color="neutral" onClick={onClose} sx={{ "&:hover": { background: "#f5f7fa" } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={{
            mt: 2,
            px: 4,
            pb: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            background: "transparent",
          }}
        >
          <FormControl>
            <FormLabel sx={{ fontWeight: 600, color: "#2d3748", mb: 0.5 }}>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              fullWidth
              sx={{
                borderRadius: 2,
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                "& input": { fontWeight: 500, letterSpacing: 0.5 },
                "&:focus-within": { borderColor: "#1976d2", boxShadow: "0 0 0 2px #1976d233" },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ fontWeight: 600, color: "#2d3748", mb: 0.5 }}>Old Password</FormLabel>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              fullWidth
              sx={{
                borderRadius: 2,
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                "& input": { fontWeight: 500, letterSpacing: 0.5 },
                "&:focus-within": { borderColor: "#1976d2", boxShadow: "0 0 0 2px #1976d233" },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ fontWeight: 600, color: "#2d3748", mb: 0.5 }}>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              fullWidth
              sx={{
                borderRadius: 2,
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                "& input": { fontWeight: 500, letterSpacing: 0.5 },
                "&:focus-within": { borderColor: "#1976d2", boxShadow: "0 0 0 2px #1976d233" },
              }}
            />
          </FormControl><Button
            variant="solid"
            color="primary"
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
              fontSize: 16,
              py: 1.2,
              transition: "all 0.2s",

            }}
            fullWidth
            disabled={isDisabled}
            onClick={() =>  handleSubmit()}
          >
            Update
          </Button>
        </Box>
      </ModalDialog> 
         </Modal>
  );
};

export default UpdatePasswordModal;
