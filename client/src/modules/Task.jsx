import {React ,useState, Fragment} from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

import { Box, Typography } from "@mui/joy";

export default function Task({ task }) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button
        sx={{
          height: "250px",
          width: "250px",
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
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="h2" fontSize="xl">
            {task.title}
          </Typography>
          <Typography level="h2" fontSize="xl">
            {task.description}
          </Typography>
          <Typography level="h2" fontSize="xl">
            Sub Tasks
          </Typography>
          {task.subtasks == null ? (
            <Box sx={{ width: 400, height: 40 }}>No Subtasks</Box>
          ) : (
            <Box>
              {task.subtasks.map((subtask) => {
                return <Typography>{subtask.title}</Typography>;
              })}
            </Box>
          )}
          <Typography level="h2" fontSize="xl">
            {task.deadline}
          </Typography>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
