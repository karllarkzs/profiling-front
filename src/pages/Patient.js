import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Box,
  AppBar,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "../components/Divider";
import { Tabs, Tab, TabPanel } from "../components/Tabs";
import { useFetchPatientById, useFetchDiagnostics } from "../api";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import AddConditionModal from "../components/AddConditionModal";
import ConfirmDeleteModal from "../components/DeleteModal";
import AddMedicationModal from "../components/AddMedicationModal";
import EditDeleteMOdal from "../components/EditCondtionModal";
import AddDiagnosticsModal from "../components/AddDiagnosticModal";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

function Patient() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isAddConditionModalOpen, setIsAddConditionModalOpen] = useState(false);
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] =
    useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedConditionId, setSelectedConditionId] = useState(null);
  const [selectedCondtionName, setSelectedConditionName] = useState("");
  const [selectedConditionDescription, setSelectedConditionDescription] =
    useState("");
  const [selectedCondition, setSelectedCondition] = useState(null);

  const [isAddDiagnosticsModalOpen, setIsAddDiagnosticsModalOpen] =
    useState(false);

  const {
    data: patientData,
    isLoading,
    isError,
    refetch,
  } = useFetchPatientById(id);
  const { data: diagnostics } = useFetchDiagnostics();

  const handleOpenDiagnosticsModal = () => {
    setIsAddDiagnosticsModalOpen(true);
  };

  const handleCloseDiagnosticsModal = () => {
    setIsAddDiagnosticsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsAddConditionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddConditionModalOpen(false);
  };

  const handleOpenAddMedicationModal = (condition) => {
    // Pass the condition to the handler
    setSelectedCondition(condition); // Set the selected condition
    setIsAddMedicationModalOpen(true);
  };

  const handleCloseAddMedicationModal = () => {
    setSelectedCondition(null); // Reset the selected condition
    setIsAddMedicationModalOpen(false);
  };
  const handleOpenEditModal = (
    conditionId,
    conditionName,
    conditionDescription
  ) => {
    setSelectedConditionId(conditionId);
    setSelectedConditionName(conditionName);
    setSelectedConditionDescription(conditionDescription);
    setIsEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedConditionId(null);
    setSelectedConditionName("");
    setSelectedConditionDescription("");
    setIsEditModal(false);
  };

  const handleOpenDeleteModal = (conditionId) => {
    setSelectedConditionId(conditionId);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedConditionId(null);
    setIsDeleteConfirmationModalOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !patientData) {
    return <Typography variant="body1">No data available.</Typography>;
  }

  const formatBDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    };
    const formattedDate = date.toLocaleDateString(undefined, options);

    return `${formattedDate}`;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: 0,
        backgroundColor: "rgb(247, 249, 252)",
        [`&.MuiContainer-root`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      <Box py={3}>
        <Divider title="PATIENT INFORMATION" />
      </Box>
      <Box>
        <Box display="flex" px={4} pb={4} justifyContent="space-between">
          <Box>
            <Typography variant="h6" style={{ wordBreak: "break-word" }}>
              Name: {patientData.first_name}
              {""} {patientData.middle_name} {patientData.last_name}
            </Typography>
            <Typography variant="subtitle2">
              Gender: {patientData.gender || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Age: {patientData.age || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Birthday: {formatBDate(patientData.birthdate || "N/A")}
            </Typography>
            <Typography variant="subtitle2">
              Contact Number: {patientData.contact_number || "N/A"}{" "}
            </Typography>
            <Typography variant="subtitle2">
              Address: {patientData.address || "N/A"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">
              Height: {patientData.height || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Weight: {patientData.weight || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Blood Pressure: {patientData.blood_pressure || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Blood Type: {patientData.blood_type || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Emergency Contact Name:{" "}
              {patientData.emergency_contact_name || "N/A"}
            </Typography>
            <Typography variant="subtitle2">
              Emergency Contact Number:{" "}
              {patientData.emergency_contact_number || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <AppBar position="relative" sx={{ backgroundColor: "#e1e3e5" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-root": {
              backgroundColor: "#f3f3ec",
            },
            "& .Mui-selected": {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="CONDITION" />
          <Tab label="DIAGNOSTIC" />
          <Tab label="HISTORY" />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {patientData.conditions.map((condition, index) => (
            <Grid item key={index} xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle2">
                      Date Added: {formatBDate(condition.createdAt)}
                    </Typography>
                    <Box>
                      <IconButton
                        onClick={() =>
                          handleOpenEditModal(
                            condition.id,
                            condition.name,
                            condition.description
                          )
                        }
                      >
                        <EditIcon style={{ fontSize: "22px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(condition.id)}
                      >
                        <DeleteIcon style={{ fontSize: "22px" }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle2">
                      Condition Name: {condition.name}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Condition Description:
                  </Typography>
                  <TextField
                    multiline
                    fullWidth
                    rows={3}
                    variant="outlined"
                    value={condition.description}
                    sx={{
                      mb: 2, // Add margin bottom
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        fontWeight: "normal",
                      },
                    }}
                  />

                  <Box display="flex" alignItems="center">
                    <Typography sx={{ fontSize: "15px" }}>
                      MEDICATIONS
                    </Typography>
                    <IconButton
                      onClick={() => handleOpenAddMedicationModal(condition)}
                    >
                      <AddCircleOutlinedIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                    <AddMedicationModal
                      condition={selectedCondition} // Pass the selected condition
                      open={isAddMedicationModalOpen}
                      onClose={handleCloseAddMedicationModal}
                      refetchPatientData={refetch}
                    />
                  </Box>

                  {condition.medications.map((medication, medIndex) => (
                    <Button
                      key={medIndex}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "rgb(188, 120, 255)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#9660CC",
                        },
                        p: "10px",
                        m: "1px",
                        height: "2rem",
                        width: "auto",
                        minWidth: "0",
                        borderRadius: "30px",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {medication.med_generic} - {medication.med_brand}
                      </Typography>
                      <IconButton>
                        <CancelIcon sx={{ color: "white", fontSize: "18px" }} />
                      </IconButton>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display="flex">
          <IconButton onClick={handleOpenModal}>
            <AddCardRoundedIcon style={{ fontSize: "3rem" }} />
          </IconButton>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h6">Diagnostics Component</Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleOpenDiagnosticsModal}
            variant="contained"
            color="primary"
          >
            Add Diagnostic
          </Button>
        </Box>
        <AddDiagnosticsModal
          open={isAddDiagnosticsModalOpen}
          onClose={handleCloseDiagnosticsModal}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {diagnostics &&
            diagnostics.map((diagnostic) => (
              <Card key={diagnostic.id} style={{ width: 300, margin: 10 }}>
                <CardContent>
                  <Typography variant="h6">{diagnostic.name}</Typography>
                  <iframe
                    src={`https://docs.google.com/viewer?url=https://profiling-2024-45cbe2fd9ee2.herokuapp.com${diagnostic.url}&embedded=true`}
                    width="100%"
                    height="300px"
                    title="Diagnostic PDF"
                  ></iframe>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Appointments content goes here
      </TabPanel>
      <AddConditionModal
        patientId={patientData.id}
        open={isAddConditionModalOpen}
        onClose={handleCloseModal}
        refetchPatientData={refetch}
      />
      <EditDeleteMOdal
        open={isEditModal}
        onClose={handleCloseEditModal}
        conditionId={selectedConditionId}
        conditionName={selectedCondtionName}
        conditionDescription={selectedConditionDescription}
        refetchPatientData={refetch}
      />
      <ConfirmDeleteModal
        open={isDeleteConfirmationModalOpen}
        onClose={handleCloseDeleteModal}
        conditionId={selectedConditionId}
        refetchPatientData={refetch}
      />
    </Container>
  );
}

export default Patient;
