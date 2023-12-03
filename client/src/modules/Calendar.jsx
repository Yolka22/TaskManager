import React, { useState, useEffect } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  isSameMonth,
  eachDayOfInterval,
  addDays,
} from "date-fns";
import { useSelector } from "react-redux";
import TasksModalHolder from "./TasksModalHolder";
import { Button, Typography } from "@mui/joy";

export default function Calendar() {
  const tasks = useSelector((state) => state.user.logedUser.tasks);

  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getWeeksInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachWeekOfInterval({ start, end });
  };

  const groupTasksByDay = () => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.deadline);
      const formattedDate = format(taskDate, "yyyy-MM-dd");
      if (!groupedTasks[formattedDate]) {
        groupedTasks[formattedDate] = [];
      }
      groupedTasks[formattedDate].push(task);
    });
    return Object.values(groupedTasks);
  };

  const tasksByDay = groupTasksByDay();

  // Используйте useState для tasksForDay
  const [tasksForDay, setTasksForDay] = useState([]);

  useEffect(() => {
    console.log(tasksByDay);
  }, []);

  // Стили для заголовков таблицы
  const tableHeaderStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    width: "14.28%", // Добавлено свойство width для равномерного распределения по 7 дням
  };

  // Стиль для ячеек
  const tableCellStyle = {
    textAlign: "center",
    padding: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    width: "14.28%", // Добавлено свойство width для равномерного распределения по 7 дням
  };

  return (
    <div style={{ width: "100%", height: "95vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <Button onClick={prevMonth}>Previous Month</Button>
        <Typography level="h3">{format(currentDate, "MMMM yyyy")}</Typography>
        <Button onClick={nextMonth}>Next Month</Button>
      </div>
      <table style={{ width: "100%", height: "90%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Sun</th>
            <th style={tableHeaderStyle}>Mon</th>
            <th style={tableHeaderStyle}>Tue</th>
            <th style={tableHeaderStyle}>Wed</th>
            <th style={tableHeaderStyle}>Thu</th>
            <th style={tableHeaderStyle}>Fri</th>
            <th style={tableHeaderStyle}>Sat</th>
          </tr>
        </thead>
        <tbody>
          {getWeeksInMonth().map((week, index) => (
            <tr key={index}>
              {eachDayOfWeek(week).map((day) => {
                const formattedDate = format(day, "yyyy-MM-dd");
                const tasksForDay = tasksByDay.find((tasks) => {
                  const taskDeadline = tasks[0]?.deadline;
                  return taskDeadline && taskDeadline.startsWith(formattedDate);
                });

                return (
                  <td
                    style={{
                      ...tableCellStyle,
                      backgroundColor: isSameMonth(day, currentDate)
                        ? "#f0f0f0"
                        : "#ddd",
                    }}
                    key={day}
                  >
                    {format(day, "d")}
                    {tasksForDay && tasksForDay.length > 0 ? (
                      <TasksModalHolder array={tasksForDay} />
                    ) : (
                      <TasksModalHolder array={[]} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function eachDayOfWeek(week) {
  return eachDayOfInterval({ start: week, end: addDays(week, 6) });
}
