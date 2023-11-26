import { Box } from '@mui/system'
import React from 'react'
import SubTask from './SubTask'

export default function SubTasksList({array}) {
  return (
    <Box>
      {array.map((item)=>{
        return <SubTask key={item.id} subtask={item}/>
      })}
    </Box>
  )
}
