import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { createMedicine, editMedicine } from "../api";

function MedicineModal({ open, onClose, refetch, data }) {
  const [medicineData, setMedicineData] = useState({
    med_brand: "",
    med_generic: "",
    med_type: "",
    med_dosage: "",
  });

  useEffect(() => {
    if (data) {
      setMedicineData({
        med_brand: data.med_brand || null,
        med_generic: data.med_generic || null,
        med_type: data.med_type || null,
        med_dosage: data.med_dosage || null,
      });
    }
  }, [data]);

  const handleCreate = async () => {
    try {
      await createMedicine(medicineData);
      refetch();
      onClose();
    } catch (error) {
      console.log("Error creating medicine", error);
    }
  };

  const handleEdit = async () => {
    try {
      await editMedicine(data.id, medicineData);
      refetch();
      onClose();
    } catch (error) {
      console.log("Error editing medicine", error);
    }
  };

  const handleSave = data ? handleEdit : handleCreate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          {data ? "Edit Medicine" : "Add Medicine"}
        </Typography>
        <TextField
          name="med_brand"
          label="Brand Name"
          fullWidth
          sx={{ mb: 2 }}
          value={medicineData.med_brand}
          onChange={handleInputChange}
        />
        <TextField
          name="med_generic"
          label="Generic Name"
          fullWidth
          sx={{ mb: 2 }}
          value={medicineData.med_generic}
          onChange={handleInputChange}
        />
        <TextField
          name="med_type"
          label="Type"
          fullWidth
          sx={{ mb: 2 }}
          value={medicineData.med_type}
          onChange={handleInputChange}
        />
        <TextField
          name="med_dosage"
          label="Dosage"
          fullWidth
          sx={{ mb: 2 }}
          value={medicineData.med_dosage}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default MedicineModal;
