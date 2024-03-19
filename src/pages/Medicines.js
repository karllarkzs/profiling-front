import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import {
  getMedicines,
  getUsers,
  useFetchMedicines,
  useLogin,
  deleteMedicine,
  editMedicine,
} from "../api";
import MedicineModal from "../components/MedicineModal";
import Divider from "../components/Divider";

function Medicines() {
  const {
    data: medicinesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchMedicines();

  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleMedicineModalOpen = (medicine) => {
    setSelectedMedicine(medicine);
    setIsMedicineModalOpen(true);
  };

  const handleMedicineModalClose = () => {
    setSelectedMedicine(null);
    setIsMedicineModalOpen(false);
  };

  return (
    <Container maxWidth={"xl"}>
      <Divider title="MEDICINES" />
      <Button></Button>
      <Paper sx={{ padding: 3 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error: {error.message}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Generic Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Brand Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Dosage</Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleMedicineModalOpen(null)}>
                    <AddBoxIcon style={{ fontSize: "22px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicinesData.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell>
                    <Typography>{medicine.med_generic}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{medicine.med_brand}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{medicine.med_type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{medicine.med_dosage}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleMedicineModalOpen(medicine)}
                    >
                      <EditIcon style={{ fontSize: "22px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteMedicine(medicine.id, refetch)}
                    >
                      <DeleteIcon style={{ fontSize: "22px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <MedicineModal
        open={isMedicineModalOpen}
        onClose={handleMedicineModalClose}
        refetch={refetch}
        data={selectedMedicine}
      />
    </Container>
  );
}

export default Medicines;
