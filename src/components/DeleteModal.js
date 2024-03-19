import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import { deleteCondition } from "../api";

function ConfirmDeleteModal({
  open,
  onClose,
  conditionId,
  refetchPatientData, // Accept refetchPatientData prop
}) {
  const handleDeleteCondition = async () => {
    try {
      await deleteCondition(conditionId);
      refetchPatientData(); // Trigger refetch after deletion
    } catch (error) {
      console.error("Error deleting condition:", error);
    } finally {
      onClose(); // Close the delete modal
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Confirm Deletion</Typography>
        <Typography variant="body1">
          Are you sure you want to delete this condition?
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleDeleteCondition}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button onClick={onClose} variant="outlined" sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmDeleteModal;
