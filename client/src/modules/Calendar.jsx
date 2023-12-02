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
import TasksList from "./TasksList"; // Импортируйте компонент TasksList

export default function Calendar() {
  const tasks = useSelector((state) => state.user.logedUser.tasks);
  const userId = useSelector((state) => state.user.logedUser.id);

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

  useEffect(() => {
    console.log(tasksByDay);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button onClick={prevMonth}>Previous Month</button>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <button onClick={nextMonth}>Next Month</button>
      </div>
      <table style={{ width: "100%", height: "100vh" }}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
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
                  
                        console.log(tasksForDay);
                return (
                  <td
                    style={{ textAlign: "center" }}
                    key={day}
                    className={
                      isSameMonth(day, currentDate)
                        ? "current-month"
                        : "other-month"
                    }
                  >
                    {format(day, "d")}
                    {tasksForDay && (
                      <TasksList array={tasksForDay} userId={userId} />
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
