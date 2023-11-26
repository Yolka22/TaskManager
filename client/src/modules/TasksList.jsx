import { Box } from "@mui/joy";
import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";

import { useDispatch } from "react-redux";

export default function TasksList({array,userId}) {

    const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 2,
        margin: "5px",
      }}
    >
      {array.map((task) => (
        <Task
          key={task.id}
          task={task}
          dispatch={dispatch}
          userId={userId}
        />
      ))}
      <AddTask />
    </Box>
  );
}