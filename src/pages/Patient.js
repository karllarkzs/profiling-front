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
import { useFetchPatientById } from "../api";

function Patient() {
  const { id } = useParams();

  const [selectedTab, setSelectedTab] = useState(0);

  const { data: patientData, isLoading, isError } = useFetchPatientById(id);

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
      <AppBar position="relative">
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          variant="fullWidth"
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
                    <Typography variant="h6">Condition {index + 1}</Typography>
                    <Box>
                      <IconButton>
                        <EditIcon style={{ fontSize: "22px" }} />
                      </IconButton>
                      <IconButton>
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
                    <Typography variant="subtitle2">
                      Checkup Date: 10/21/2025
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

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    MEDICATIONS
                  </Typography>
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
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        History content goes here
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Appointments content goes here
      </TabPanel>
    </Container>
  );
}

export default Patient;
