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
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { useFetchPatients } from "../api"; // Import the useFetchPatients hook
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Divider from "../components/Divider";

function Dashboard() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const { data: patientsData, isLoading, isError, error } = useFetchPatients(); // Fetch patient data

  console.log("PD", patientsData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}`;
  };

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

  const filteredPatients = patientsData
    ?.filter(
      (patient) =>
        patient.first_name?.toLowerCase().includes(searchName.toLowerCase()) ||
        patient.last_name?.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((patient) => {
      if (!selectedDate) return true; // If no date is selected, include all patients
      const createdAt = new Date(patient.createdAt);
      const selectedDateWithoutTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const createdAtWithoutTime = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate()
      );
      return (
        createdAtWithoutTime.getTime() === selectedDateWithoutTime.getTime()
      ); // Filter by selected date
    });

  const handleDateChange = (newValue) => {
    // Check if newValue is a Day.js object
    if (newValue && newValue.$isDayjsObject) {
      // Extract necessary date components from the Day.js object
      const year = newValue.$y;
      const month = newValue.$M;
      const day = newValue.$D;

      // Create a new Date object
      const selectedDate = new Date(year, month, day);

      // Set the selected date
      setSelectedDate(selectedDate);
    } else {
      // If newValue is not a Day.js object, set it directly
      setSelectedDate(newValue);
    }
  };
  if (isLoading) return <div>Loading...</div>; // Render loading state while fetching data
  if (isError) return <div>Error: {error.message}</div>; // Render error message if fetching data fails

  return (
    <Box sx={{ backgroundColor: "rgb(247, 249, 252)", padding: "10px" }}>
      <Box py={1}>
        <Divider title="PATIENT LIST" />
      </Box>
      <Box
        component={Paper}
        sx={{
          backgroundColor: "white",
          padding: "8px",
          boxShadow: "none",
          border: "1px dotted gray",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Search by Name */}
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ flex: 1, marginRight: "16px" }}
            size="small"
          />

          {/* Clear Search Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSearchName("")}
            size="medium"
            sx={{ marginRight: "16px" }}
          >
            Clear
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Filter by Date"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                minWidth: 250,
                "& input": {
                  height: "0.4375em", // Set the height of the input field
                },
                "& .MuiInputLabel-root": {
                  top: "-7px", // Adjust vertical alignment of the label
                },
              }}
              slotProps={{
                textField: {
                  InputProps: {
                    startAdornment: selectedDate && (
                      <IconButton
                        onClick={() => setSelectedDate(null)}
                        color="primary"
                        sx={{ marginRight: "8px" }} // Add padding to the right of the IconButton
                      >
                        <Clear />
                      </IconButton>
                    ),
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box
        component={Paper}
        sx={{
          backgroundColor: "white",
          marginTop: "10px",
          boxShadow: "none",
          border: "1px dotted gray",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Created Date</TableCell>{" "}
                {/* New column for added date */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) =>
                  patient ? ( // Ensure patient exists before rendering the row
                    <TableRow
                      key={patient.id}
                      onClick={() => navigate(`/patient/${patient.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{patient.first_name}</TableCell>
                      <TableCell>{patient.last_name}</TableCell>
                      <TableCell>{formatBDate(patient.birthdate)}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.contact_number}</TableCell>
                      <TableCell>{formatDate(patient.createdAt)}</TableCell>
                    </TableRow>
                  ) : null
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={filteredPatients?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

export default Dashboard;
