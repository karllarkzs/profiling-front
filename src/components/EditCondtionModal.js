import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { editCondition } from "../api"; // Import the createCondition function from your API file

function EditConditionModal({
  open,
  onClose,
  conditionId,
  conditionName,
  conditionDescription,
  refetchPatientData,
}) {
  const [condName, setConditionName] = useState("");
  const [condDescription, setConditionDescription] = useState("");

  useEffect(() => {
    setConditionName(conditionName);
    setConditionDescription(conditionDescription);
  }, [conditionName, conditionDescription]);

  const handleSave = async () => {
    try {
      await editCondition(conditionId, condName, condDescription);
      console.log("Successful");
      refetchPatientData();
    } catch (error) {
      console.error("Error creating condition:", error);
    } finally {
      console.log("finally");
      onClose();
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
          Add Condition
        </Typography>
        <TextField
          label="Condition Name"
          fullWidth
          value={condName}
          onChange={(e) => setConditionName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Condition Description"
          multiline
          fullWidth
          rows={4}
          value={condDescription}
          onChange={(e) => setConditionDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default EditConditionModal;
