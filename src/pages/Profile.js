import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useFetchPatients, useCreatePatient } from '../api'; // Adjust the path as needed

function Profile() {
  const { data: patients, isLoading, isError, refetch } = useFetchPatients();
  const [open, setOpen] = useState(false);
  const createPatientMutation = useCreatePatient();

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    occupation: '',
    marital_status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientMutation.mutateAsync(formData);
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching patient data</div>;

  if (!Array.isArray(patients.data)) return <div>No patient data available</div>;

  return (
    <div>
      <Typography variant="h1">Profile Page</Typography>
      <Typography>Welcome to the profile page!</Typography>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add New Patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            {/* Add more fields as needed */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <ul>
  {patients.data.map(({ attributes, id }) => (
    <li key={id}>
      {attributes.first_name} {attributes.last_name}
    </li>
  ))}
</ul>

    </div>
  );
}

export default Profile;
