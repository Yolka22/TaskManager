import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import AddTask from "../AddTask";
import Task from "../Task";
import { Box, Typography } from "@mui/joy";
import { styled } from "@mui/system";

import { useDispatch } from "react-redux";

const CustomTabs = styled(Tabs)({
  backgroundColor: "#f0f0f0",
  height: "100vh",
});

const CustomTabsList = styled(TabsList)({
  display: "flex",
  fontSize: "16px",
  justifyContent: "center",
});

const CustomTab = styled(Tab)(({ selected }) => ({
  cursor: "pointer",
  width: "100%",
  height: "30px",
  margin: "5px",
  ":hover":{
    backgroundColor:"#BAD4AA"
  },
  borderRadius: "5px",
  color: selected ? "blue" : "inherit",
  backgroundColor: selected ? "#E8871E" : "inherit",
}));

export default function HomePage() {
  const logUser = useSelector((state) => state.user.logedUser);
  const [selectedTab, setSelectedTab] = useState(1);

  const dispatch = useDispatch();

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <CustomTabs value={selectedTab} onChange={handleChangeTab}>
      <CustomTabsList>
        <CustomTab value={1} selected={selectedTab === 1}>
          <Typography level="h3" fontSize="xl">Tasks</Typography>
        </CustomTab>
        <CustomTab value={2} selected={selectedTab === 2}>
        <Typography level="h3" fontSize="xl">User Info</Typography>
        </CustomTab>
        <CustomTab value={3} selected={selectedTab === 3}>
        <Typography level="h3" fontSize="xl">Stat</Typography>
        </CustomTab>
      </CustomTabsList>
      <TabPanel value={1}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            margin:"5px",
          }}
        >
          {logUser.tasks.map((task) => (
            <Task key={task.id} task={task} dispatch={dispatch} userId={logUser.id}/>
          ))}
          <AddTask />
        </Box>
      </TabPanel>
      <TabPanel value={2}>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography>Id:</Typography>
            <Typography>{logUser.id}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>name:</Typography>
            <Typography>{logUser.name}</Typography>
          </Box>
        </Box>
      </TabPanel>
    </CustomTabs>
  );
}
