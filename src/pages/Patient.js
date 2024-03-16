import React from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useFetchPatientById } from "../api";

function Patient() {
  const { id } = useParams();

  const { data: patientData, isLoading, isError } = useFetchPatientById(id); // Fetch patient data

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
    <Box mt={4} px={8} pt={4}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" style={{ wordBreak: "break-word" }}>
            Name: {patientData.first_name}
            {""} {patientData.middle_name} {patientData.last_name}
          </Typography>
          <Typography>Age: {patientData.age}</Typography>
          <Typography>
            Birthday: {formatBDate(patientData.birthdate)}
          </Typography>
          <Typography>Address: {patientData.address}</Typography>
        </Box>
        <Box>
          <Typography variant="h5" style={{ wordBreak: "break-word" }}>
            Last Name: {patientData.last_name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Patient;
