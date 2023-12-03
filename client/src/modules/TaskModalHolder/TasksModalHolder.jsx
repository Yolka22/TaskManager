import React, { useState } from "react";
import TasksList from "../TasksList";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Button, Box, Typography } from "@mui/joy";

import styles from "./styles.module.css";

export default function TasksModalHolder({ array }) {
  const blinkingAnimation = `${styles.blinking} 1s infinite alternate`;

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button
        className={styles.blinking}
        sx={{
          height: "40px",
          width: "40px",
          borderRadius: "20px",
          backgroundColor: "#EBF5DF",
          ":hover": {
            backgroundColor: "#BAD4AA",
          },

          animation: array.length > 0 ? blinkingAnimation : "none",
          transition: "ease-in-out",
        }}
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Typography
          sx={{
            color: array.length > 0 ? "#fff" : "#000",
          }}
        >
          {array.length > 0 ? (
            array.length
          ) : (
            <Typography fontSize="xl" sx={{ color: "teal", fontWeight: 500 }}>
              +
            </Typography>
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        ></Box>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          width: "80vw",
          height: "80vh",
          margin: "auto",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",

            width: "100%",
            height: "100%",
          }}
        >
          <ModalClose variant="plain" size="xl" sx={{ m: 2 }} />
          <TasksList array={array} />
        </Sheet>
      </Modal>
    </Box>
  );
}
