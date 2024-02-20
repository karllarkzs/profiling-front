// Dashboard.js
import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination } from '@mui/material';

const patients = [
  { id: 1, firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01', age: 32, gender: 'Male', contactNumber: '1234567890' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', dateOfBirth: '1995-05-15', age: 27, gender: 'Female', contactNumber: '9876543210' },
  { id: 3, firstName: 'Adam', lastName: 'Smith', dateOfBirth: '1988-03-25', age: 34, gender: 'Male', contactNumber: '5551234567' },
  { id: 4, firstName: 'Emily', lastName: 'Johnson', dateOfBirth: '1985-09-10', age: 37, gender: 'Female', contactNumber: '5559876543' },
  { id: 5, firstName: 'Michael', lastName: 'Williams', dateOfBirth: '1993-07-18', age: 29, gender: 'Male', contactNumber: '5552345678' },
  { id: 6, firstName: 'Jessica', lastName: 'Brown', dateOfBirth: '1987-11-05', age: 34, gender: 'Female', contactNumber: '5558765432' },
  { id: 7, firstName: 'William', lastName: 'Jones', dateOfBirth: '1991-04-12', age: 30, gender: 'Male', contactNumber: '5553456789' },
  { id: 8, firstName: 'Emma', lastName: 'Garcia', dateOfBirth: '1989-08-22', age: 32, gender: 'Female', contactNumber: '5557654321' },
  { id: 9, firstName: 'Liam', lastName: 'Martinez', dateOfBirth: '1996-02-08', age: 26, gender: 'Male', contactNumber: '5554567890' },
  { id: 10, firstName: 'Olivia', lastName: 'Hernandez', dateOfBirth: '1990-12-30', age: 31, gender: 'Female', contactNumber: '5556543210' },
  { id: 11, firstName: 'James', lastName: 'Lopez', dateOfBirth: '1986-06-19', age: 35, gender: 'Male', contactNumber: '5552345678' },
  { id: 12, firstName: 'Ava', lastName: 'Gonzalez', dateOfBirth: '1984-10-14', age: 37, gender: 'Female', contactNumber: '5558765432' },
  { id: 13, firstName: 'Logan', lastName: 'Wilson', dateOfBirth: '1994-03-27', age: 28, gender: 'Male', contactNumber: '5553456789' },
  { id: 14, firstName: 'Sophia', lastName: 'Perez', dateOfBirth: '1992-05-03', age: 30, gender: 'Female', contactNumber: '5557654321' },
  { id: 15, firstName: 'Benjamin', lastName: 'Taylor', dateOfBirth: '1988-09-09', age: 33, gender: 'Male', contactNumber: '5554567890' },
  { id: 16, firstName: 'Mia', lastName: 'Martin', dateOfBirth: '1993-11-24', age: 28, gender: 'Female', contactNumber: '5556543210' },
  { id: 17, firstName: 'Mason', lastName: 'Hernandez', dateOfBirth: '1997-01-05', age: 25, gender: 'Male', contactNumber: '5552345678' },
  { id: 18, firstName: 'Amelia', lastName: 'Young', dateOfBirth: '1985-07-11', age: 36, gender: 'Female', contactNumber: '5558765432' },
  { id: 19, firstName: 'Ethan', lastName: 'White', dateOfBirth: '1989-04-01', age: 32, gender: 'Male', contactNumber: '5553456789' },
  { id: 20, firstName: 'Harper', lastName: 'Allen', dateOfBirth: '1996-12-18', age: 25, gender: 'Female', contactNumber: '5557654321' },
  { id: 21, firstName: 'Evelyn', lastName: 'King', dateOfBirth: '1987-02-28', age: 34, gender: 'Male', contactNumber: '5554567890' },
];


function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: 'rgb(247, 249, 252)', padding: '12px' }}>
      <Typography gutterBottom>
        Patient List
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '50%' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ flex: 1, marginRight: '16px' }}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={() => setSearchName('')} size="medium">
          Clear
        </Button>
      </Box>
      <Box component={Paper} sx={{ backgroundColor: 'white', borderRadius: '8px' }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.firstName}</TableCell>
                  <TableCell>{patient.lastName}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={filteredPatients.length}
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
