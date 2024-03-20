// AddDiagnosticsModal.js
import React, { useState } from "react";
import { Modal, Paper, Typography, Button, Box } from "@mui/material";
import { createDiagnostic } from "../api";

function AddDiagnosticsModal({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile)); // Create URL for the selected file
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await createDiagnostic(formData, fileUrl); // Pass fileUrl to createDiagnostic
      console.log("Diagnostic PDF uploaded successfully");
    } catch (error) {
      console.error("Error uploading diagnostic PDF:", error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Upload Diagnostic PDF
          </Typography>
          <input type="file" id="fileInput" onChange={handleFileChange} />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleUpload} variant="contained" color="primary">
              Upload
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}

export default AddDiagnosticsModal;
