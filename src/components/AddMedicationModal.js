import React, { useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { createMedication } from "../api";

function AddMedicationModal({
  open,
  onClose,
  conditionId,
  conditionName,
  refetchPatientData,
}) {
  const [formData, setFormData] = useState({
    conditionId: conditionId,
    med_generic: "",
    med_brand: "",
    med_dosage: "",
    med_type: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedication(formData);
      // Optionally, you can clear the form after submission
      setFormData({
        conditionId: conditionId,
        med_generic: "",
        med_brand: "",
        med_dosage: "",
        med_type: "",
        note: "",
      });
      refetchPatientData();
    } catch (error) {
      console.error("Error creating medication:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Medication on condition {conditionName}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Generic Name"
            name="med_generic"
            fullWidth
            value={formData.med_generic}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Brand Name"
            name="med_brand"
            fullWidth
            value={formData.med_brand}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Dosage"
            name="med_dosage"
            fullWidth
            value={formData.med_dosage}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Medicine Type"
            name="med_type"
            fullWidth
            value={formData.med_type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="NOTE"
            name="note"
            multiline
            fullWidth
            rows={4}
            value={formData.note}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
}

export default AddMedicationModal;
