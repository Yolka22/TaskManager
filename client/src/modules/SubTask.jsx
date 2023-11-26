import { Box, Typography, Button } from "@mui/joy";
import React from "react";
import ApiHandler from "../API/ApiHandler";

import { useDispatch, useSelector } from "react-redux";

export default function SubTask({ subtask }) {
  const dispatch = useDispatch();

  const subtaskId = subtask.id;
  const userId = useSelector((state) => state.user.logedUser.id);

  const deleteHandler = () => {
    ApiHandler.deleteSubTask(subtaskId);
    setTimeout(() => {
      ApiHandler.UserRefresh(userId, dispatch);
    }, 500);
  };

  return (
    <Box sx={{ display: "flex", marginTop: "5px" }}>
      <Button color="danger" onClick={deleteHandler}>-</Button>
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
    </Box>
  );
}
