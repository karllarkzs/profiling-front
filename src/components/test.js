// import React, { useState } from "react";
// import {
//   Modal,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";

// import { createCondition } from "../api";

// function AddConditionModal({ open, onClose, patientId, refetchPatientData }) {
//   const [conditionName, setConditionName] = useState("");
//   const [conditionDescription, setConditionDescription] = useState("");

//   const handleSave = async () => {
//     try {
//       await createCondition(patientId, conditionName, conditionDescription);
//       console.log("Successful");
//       refetchPatientData();
//       setConditionName("");
//       setConditionDescription("");
//     } catch (error) {
//       console.error("Error creating condition:", error);
//     } finally {
//       console.log("finally");
//       onClose(); // Close the modal
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Paper
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Add Condition
//         </Typography>
//         <TextField
//           label="Condition Name"
//           fullWidth
//           value={conditionName}
//           onChange={(e) => setConditionName(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Condition Description"
//           multiline
//           fullWidth
//           rows={4}
//           value={conditionDescription}
//           onChange={(e) => setConditionDescription(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Box display="flex" justifyContent="flex-end">
//           <Button onClick={handleSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </Box>
//       </Paper>
//     </Modal>
//   );
// }

// export default AddConditionModal;
