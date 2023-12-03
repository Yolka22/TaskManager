import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import { Box } from "@mui/joy";
import { styled } from "@mui/system";

import TasksListWithSort from "../TasksListWithSort";
import Calendar from "../Calendar";

const CustomButton = styled(Button)({
  fontSize: "16px",
  height: "100%",
  borderRadius: "5px",
  background: "#fff",
  margin:"5px"
});

export default function HomePage() {
  const logUser = useSelector((state) => state.user.logedUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1); // Add this line

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (newValue) => {
    setSelectedTab(newValue);
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <CustomButton onClick={handleClick}>
          <Typography level="h3" fontSize="xl">
            Menu
          </Typography>
        </CustomButton>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick(1)}>
          <Typography level="h3" fontSize="xl">
            Calendar
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(2)}>
          <Typography level="h3" fontSize="xl">
            Schedule
          </Typography>
        </MenuItem>
      </Menu>
      {selectedTab === 1 && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Calendar />
          </Box>
        </Box>
      )}
      {selectedTab === 2 && (
        <TasksListWithSort array={logUser.tasks} userId={logUser.id} />
      )}
    </Box>
  );
}
