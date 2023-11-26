import { React, useState, Fragment } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

import { Box, Input, Typography } from "@mui/joy";

import ApiHandler from "../API/ApiHandler";
import SubTasksList from "./SubTasksList";

export default function Task({ task, userId, dispatch }) {
  const [open, setOpen] = useState(false);
  const [newSubTask, setSubTask] = useState("");
  const TaskId = task.id;
  const deleteHandler = () => {
    ApiHandler.TaskDelete(task.id);

    setTimeout(() => {
      ApiHandler.UserRefresh(userId, dispatch);
    }, 500);
  };

  const addSubtaskHandler = () => {
    ApiHandler.addSubTask({ TaskId: TaskId, title: newSubTask });
    setTimeout(() => {
      ApiHandler.UserRefresh(userId, dispatch);
    }, 500);
  };

  return (
    <Fragment>
      <Button
        sx={{
          height: "250px",
          width: "250px",
          backgroundColor: "#EBF5DF",
          ":hover": {
            backgroundColor: "#BAD4AA",
          },
        }}
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>{task.title}</Typography>
          <Typography>{task.id}</Typography>
        </Box>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 400,
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h2" fontSize="xl">
            {`Priority: ${task.priority}`}
          </Typography>
          <Typography level="h2" fontSize="xl">
          {`Title: ${task.title}`}
          </Typography>
          <Typography level="h2" fontSize="xl">
          {`Description: ${task.description}`}
          </Typography>
          <Typography level="h2" fontSize="xl">
            Sub Tasks
          </Typography>
          {task.subtasks == null ? (
            <Box sx={{ width: 400, height: 40 }}>No Subtasks</Box>
          ) : (
            <SubTasksList array={task.subtasks} />
          )}
          <Box sx={{ display: "flex" }}>
            <Input
              onChange={(e) => {
                setSubTask(e.target.value);
              }}
              sx={{ flexGrow: 1 }}
            ></Input>
            <Button
              onClick={addSubtaskHandler}
              sx={{
                alignSelf: "center",
              }}
            >
              add subTask
            </Button>
          </Box>

          <Typography level="h2" fontSize="xl">
          {`Deadline: ${task.deadline}`}
          </Typography>
          <Button color="danger" onClick={deleteHandler}>
            delete
          </Button>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
