import React, { useState } from 'react';
import TasksList from './TasksList';
import { Box, ButtonGroup, Button } from '@mui/joy';

export default function TasksListWithSort({ array, userId }) {
  const [tasks, setTasks] = useState(array);
  const [sortType, setSortType] = useState(null);

  const handleSort = (type) => {
    let sortedTasks = [...array]; // Use the original array
    if (sortType === type) {
      // Toggle sorting when the same button is clicked again
      sortedTasks.reverse();
    } else {
      switch (type) {
        case 'day':
          sortedTasks = sortByDeadline(sortedTasks, 'day');
          break;
        case 'week':
          sortedTasks = sortByDeadline(sortedTasks, 'week');
          break;
        case 'month':
          sortedTasks = sortByDeadline(sortedTasks, 'month');
          break;
        case 'priority':
          sortedTasks.sort((a, b) => b.priority - a.priority);
          break;
        default:
          // No sorting, use the original array
          break;
      }
    }
    setSortType(type);
    setTasks(sortedTasks);
  };

  const sortByDeadline = (tasksToSort, timeFrame) => {
    const today = new Date();
    switch (timeFrame) {
      case 'day':
        return tasksToSort.filter(task => {
          const deadlineDate = new Date(task.deadline);
          return (
            deadlineDate.getDate() === today.getDate() &&
            deadlineDate.getMonth() === today.getMonth() &&
            deadlineDate.getFullYear() === today.getFullYear()
          );
        });
      case 'week':
        return tasksToSort.filter(task => {
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + 7);
          const deadlineDate = new Date(task.deadline);
          return deadlineDate >= today && deadlineDate <= endOfWeek;
        });
      case 'month':
        return tasksToSort.filter(task => {
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          const deadlineDate = new Date(task.deadline);
          return deadlineDate >= today && deadlineDate <= endOfMonth;
        });
      default:
        return tasksToSort;
    }
  };

  return (
    <Box>
      <ButtonGroup>
        <Button
          onClick={() => handleSort('day')}
          variant={sortType === 'day' ? 'contained' : 'outlined'}
        >
          Day
        </Button>
        <Button
          onClick={() => handleSort('week')}
          variant={sortType === 'week' ? 'contained' : 'outlined'}
        >
          Week
        </Button>
        <Button
          onClick={() => handleSort('month')}
          variant={sortType === 'month' ? 'contained' : 'outlined'}
        >
          Month
        </Button>
        <Button
          onClick={() => handleSort('priority')}
          variant={sortType === 'priority' ? 'contained' : 'outlined'}
        >
          Priority
        </Button>
        <Button onClick={() => handleSort(null)}>Clear</Button>
      </ButtonGroup>
      <TasksList array={tasks} userId={userId} />
    </Box>
  );
}
