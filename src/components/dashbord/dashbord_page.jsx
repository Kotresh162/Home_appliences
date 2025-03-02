import React, { useEffect, useState } from "react";
import socket from "../../services/socket.js";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const EnergyDashboard = () => {
  const [energyData, setEnergyData] = useState([]);
  const [deviceData, setDeviceData] = useState({});

  useEffect(() => {
    socket.on("message", (data) => {
      const parsedData = JSON.parse(data);
      setEnergyData((prev) => [...prev.slice(-20), parsedData]);

      setDeviceData((prev) => ({
        ...prev,
        [parsedData.deviceName]: (prev[parsedData.deviceName] || 0) + parsedData.energyUsed,
      }));
    });

    return () => socket.off("message");
  }, []);

  const lineChartData = {
    labels: energyData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: energyData.map((d) => d.energyUsed),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(deviceData),
    datasets: [
      {
        label: "Total Energy Used (kWh)",
        data: Object.values(deviceData),
        backgroundColor: "green",
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
        Real-Time Energy Monitoring
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Real-Time Energy Consumption</Typography>
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Device-Wise Energy Usage</Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EnergyDashboard;
