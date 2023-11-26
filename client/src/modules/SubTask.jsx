import { Box } from '@mui/joy'
import React from 'react'

export default function SubTask({subtask}) {

    const id = subtask.id;

  return (
    <Box>
      {subtask.title}
    </Box>
  )
}
