import { Box, Typography, Button, Switch } from "@mui/joy";
import React, { useEffect, useState, useRef } from "react";
import ApiHandler from "../API/ApiHandler";

import { useDispatch, useSelector } from "react-redux";

export default function SubTask({ subtask }) {
  const dispatch = useDispatch();

  const subtaskId = subtask.id;
  const userId = useSelector((state) => state.user.logedUser.id);
  const [isCompleted, setisCompleted] = useState(subtask.isCompleted);

  const initialRender = useRef(true);

  const deleteHandler = () => {
    ApiHandler.deleteSubTask(subtaskId);
    setTimeout(() => {
      ApiHandler.UserRefresh(userId, dispatch);
    }, 500);
  };

  useEffect(() => {
    // Skip the initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Call the API function when isCompleted changes
    ApiHandler.changeSubTaskStatus(subtaskId);
  }, [isCompleted,subtaskId]);

  return (
    <Box sx={{ display: "flex", marginTop: "5px" }}>
      <Button color="danger" onClick={deleteHandler}>
        -
      </Button>
      <Typography
        fontSize="xl"
        sx={{
          marginLeft: "10px",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {subtask.title}
      </Typography>
      <Switch
        checked={isCompleted}
        onChange={(event) => setisCompleted(event.target.checked)}
      ></Switch>
    </Box>
  );
}
