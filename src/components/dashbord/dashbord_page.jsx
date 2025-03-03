import React, { useState, useEffect } from 'react';
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography, Avatar } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import './dashbord.module.css';  // Import the CSS file

// Registering Chart.js elements
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function EnergyDashboard() {
  const [scrolling, setScrolling] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [energyData, setEnergyData] = useState([]);
  const [user] = useState({ name: "John Doe", profilePicture: "/path-to-your-image.jpg" }); // Example user data

  // Handle scroll event to change navbar color
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true); // Change navbar color after scrolling 50px
    } else {
      setScrolling(false);
    }
  };

  // Open and close profile menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch data (replace with actual API call)
  useEffect(() => {
    const data = [
      { deviceId: "microwave654", energyUsed: 1.2, deviceName: "Microwave" },
      { deviceId: "washingmachine321", energyUsed: 2.1, deviceName: "Washing Machine" },
      { deviceId: "ac789", energyUsed: 3.2, deviceName: "Air Conditioner" },
      { deviceId: "fridge456", energyUsed: 1.8, deviceName: "Fridge" },
      { deviceId: "oven123", energyUsed: 2.5, deviceName: "Oven" },
    ];
    setEnergyData(data);
  }, []);

  // Calculate total energy used
  const totalEnergyUsed = energyData.reduce((total, device) => total + device.energyUsed, 0);

  // Bar Chart Data
  const barChartData = {
    labels: energyData.map(device => device.deviceName),
    datasets: [
      {
        label: 'Energy Used (kWh)',
        data: energyData.map(device => device.energyUsed),
        backgroundColor: energyData.map(() => {
          const hue = Math.floor(Math.random() * 360);
          return `hsl(${hue}, 100%, 50%)`;
        }),
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: energyData.map(device => device.deviceName),
    datasets: [
      {
        label: 'Energy Used',
        data: energyData.map(device => (device.energyUsed / totalEnergyUsed) * 100), // Percentage of total energy
        backgroundColor: energyData.map(() => {
          const hue = Math.floor(Math.random() * 360);
          return `hsl(${hue}, 100%, 50%)`;
        }),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Listen to the scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} className="energy-dashboard-container">
      {/* Header with Navbar */}
      <AppBar
        position="sticky"
        className={scrolling ? "appbar-scrolling" : "appbar-transparent"}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Energy Dashboard
          </Typography>

          {/* Profile Button with Avatar */}
          <IconButton edge="end" color="inherit" onClick={handleMenu} sx={{ padding: 0 }} className="profile-button">
            <Avatar alt={user.name} src={user.profilePicture} />
          </IconButton>

          {/* Menu for profile options */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="profile-menu">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content: Energy Dashboard */}
      <Box className="energy-dashboard-header">
        <Typography variant="h4" className="energy-dashboard-title" gutterBottom>
          Energy Dashboard
        </Typography>

        <Grid container spacing={3} className="grid-container">
          {/* Bar Chart Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} className="bar-chart-paper">
              <Typography variant="h6" gutterBottom>
                Energy Used by Device (Bar Chart)
              </Typography>
              <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </Paper>
          </Grid>

          {/* Pie Chart Section */}
          <Grid item xs={12} md={5} className="pie-chart-container">
            <Paper elevation={3} className="pie-chart-paper">
              <Typography variant="h6" gutterBottom>
                Energy Usage Distribution (Pie Chart)
              </Typography>
              <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </Paper>
          </Grid>
        </Grid>

        <Box className="total-energy">
          <Typography variant="h6">
            Total Energy Used: {totalEnergyUsed.toFixed(2)} kWh
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
