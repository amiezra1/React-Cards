import React, { useState, useEffect } from 'react';
import './clock.css';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../../layout/LayoutComponent';

const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setDateTime(new Date());
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (time) => {
    const day = time.getDate();
    const month = time.getMonth() + 1; // January is 0
    const year = time.getFullYear();

    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  return (
    <Box
      className="clock-container"
      sx={{
        backgroundColor: isDarkTheme ? '#3c3c3c' : '#FFFFCC',
        color: isDarkTheme ? '#FFFFFF' : '#000000',
      }}
    >
      <Typography className="clock-title">Clock</Typography>
      <Typography className="clock-date">{formatDate(dateTime)}</Typography>
      <Typography className="clock-time">{formatTime(dateTime)}</Typography>
    </Box>
  );
};

export default Clock;
