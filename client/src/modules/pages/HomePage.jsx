import React from "react";
import { useSelector } from "react-redux";

import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import AddTask from "../AddTask";
import Task from "../Task";
import { Box, Typography } from "@mui/joy";

export default function HomePage() {
  const logUser = useSelector((state) => state.user.logedUser);

  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>Tasks</Tab>
        <Tab value={2}>User Info</Tab>
      </TabsList>
      <TabPanel value={1}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {logUser.tasks.map((task) => {
            return <Task key={task.id} task={task}></Task>;
          })}

          <AddTask></AddTask>
        </Box>
      </TabPanel>
      <TabPanel value={2}>
        <Box>
          <Box sx={{display:"flex"}}><Typography>Id:</Typography> <Typography>{logUser.id}</Typography></Box>
          <Box sx={{display:"flex"}}><Typography>name:</Typography> <Typography>{logUser.name}</Typography></Box>
        </Box>
      </TabPanel>
    </Tabs>
  );
}
