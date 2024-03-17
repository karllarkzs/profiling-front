import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Box,
  MenuItem,
  Container,
} from "@mui/material";
import { createPatient } from "../api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Divider from "../components/Divider";

function CreatePatient() {
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    birthdate: null,
    gender: "",
    contact_number: "",
    address: "",
    emergency_contact: "",
    emergency_contact_name: "",
    height: "",
    weight: "",
    blood_pressure: "",
    blood_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      // Set the birthdate in the form data
      setFormData({ ...formData, birthdate: selectedDate });
    } else {
      // If newValue is not a Day.js object, clear the selected date
      setSelectedDate(null);

      // Clear the birthdate in the form data
      setFormData({ ...formData, birthdate: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      // Optionally, you can clear the form after submission
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        birthdate: null,
        age: "",
        gender: "",
        contact_number: "",
        address: "",
        emergency_contact: "",
        emergency_contact_name: "",
        height: "",
        weight: "",
        blood_pressure: "",
        blood_type: "",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box py={3}>
        <Divider title="CREATE PATIENT" />
      </Box>
      <Card elevation={10} style={{ marginLeft: "10px", marginRight: "10px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Middle Name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={(date) => handleDateChange(date)}
                    slotProps={{
                      textField: {
                        InputProps: {
                          startAdornment: selectedDate ? (
                            <IconButton
                              onClick={() => handleDateChange(null)} // Clear the date when clicked
                              color="primary"
                              sx={{
                                marginRight: "8px", // Add padding to the right of the IconButton
                              }}
                            >
                              <Clear />
                            </IconButton>
                          ) : null, // Render nothing if no date is selected
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="">-</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Info"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Blood Pressure"
                  name="blood_pressure"
                  value={formData.blood_pressure}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Blood Type"
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Emergency Contact Name"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Emergency Contact"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "rgb(188, 120, 255)" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreatePatient;
