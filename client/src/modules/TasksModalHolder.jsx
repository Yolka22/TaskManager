import React, {useState} from "react";
import TasksList from "./TasksList";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Button,Box , Typography } from "@mui/joy";


export default function TasksModalHolder({ array }) {

  const blinkingAnimation = `
  blinking 1s infinite
`;

    const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button
        sx={{
          height: "40px",
          width: "40px",
          backgroundColor: "#EBF5DF",
          ":hover": {
            backgroundColor: "#BAD4AA",
          },
          animation:blinkingAnimation,
        }}
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Typography>{array.length}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
          }}
        >
            <ModalClose variant="plain" sx={{ m: 1 }} />
        <TasksList array={array} />
        </Sheet>
        
        </Modal>
      
    </Box>
  );
}
