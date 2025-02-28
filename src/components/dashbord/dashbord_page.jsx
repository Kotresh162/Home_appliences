  import React, { useState, useEffect } from "react";
  import { Container, Grid2, Card, CardContent, Typography, Button } from "@mui/material";
  import { Line } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
  } from "chart.js";
  
  ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);
  
  const Dashboard = () => {
    const [energyData, setEnergyData] = useState([]);
    const [budget, setBudget] = useState(100);
    const [alert, setAlert] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const newUsage = Math.floor(Math.random() * 50) + 1;
        setEnergyData((prevData) => [...prevData.slice(-9), { usage: newUsage }]);
        if (newUsage > budget) setAlert(true);
      }, 2000);
  
      return () => clearInterval(interval);
    }, [budget]);
  
    const chartData = {
      labels: energyData.map((_, index) => index + 1),
      datasets: [
        {
          label: "Energy Consumption (kWh)",
          data: energyData.map((data) => data.usage),
          fill: false,
          borderColor: "#3f51b5",
          tension: 0.1,
        },
      ],
    };
  
    return (
        <>
        <nav>the navbar</nav>
      <Container>
        <Typography variant="h4" gutterBottom>
          Energy Consumption Dashboard
        </Typography>
        {alert && <Typography color="error">Budget Exceeded!</Typography>}
        <Grid2 container spacing={3}>
          <Grid2 item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Real-Time Energy Consumption</Typography>
                {energyData.length > 0 ? <Line data={chartData} /> : <Typography>Loading data...</Typography>}
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Set Energy Budget</Typography>
                <Typography variant="h4">{budget} kWh</Typography>
                <Button variant="contained" color="primary" onClick={() => setBudget(budget + 10)}>
                  Increase Budget
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setBudget(budget - 10)}>
                  Decrease Budget
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
      </>
    );
  };
  
  export default Dashboard;
  