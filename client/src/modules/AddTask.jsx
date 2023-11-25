import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

import AddTaskForm from './forms/AddTaskForm';
import { Typography } from '@mui/joy';

export default function AddTask() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button sx={{
        height:"250px",
        width:"250px",
        background:"gray"
      }} variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <Typography>Add Task</Typography>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <AddTaskForm></AddTaskForm>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}