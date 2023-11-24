import React from "react";
import { useSelector } from "react-redux";

import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';

export default function HomePage() {
  const logUser = useSelector((state) => state.user.logedUser);

  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>Name</Tab>
        <Tab value={2}>Id</Tab>
        <Tab value={3}>Tasks</Tab>
      </TabsList>
      <TabPanel value={1}>{logUser.name}</TabPanel>
      <TabPanel value={2}>{logUser.id}</TabPanel>
      <TabPanel value={3}>{logUser.tasks.map((task)=>{
        return(
            <div key={task.id}>
                {task.title}
            </div>
        )
      })}</TabPanel>
    </Tabs>
  );
}

