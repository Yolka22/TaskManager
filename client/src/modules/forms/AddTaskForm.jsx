import React from 'react';
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { useDispatch,useSelector } from 'react-redux';
export default function AddTaskForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const UserId = useSelector((state) => state.user.logedUser.id);
    const onSubmit = async (taskData) => {
        try {
            taskData.UserId=UserId;
            await ApiHandler.TaskAdd( taskData , dispatch);
            await ApiHandler.UserRefresh( UserId , dispatch);
            
        } catch (error) {
            console.error("Error adding task", error);
        }
    };
    

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input {...register("Title", { required: true })} placeholder="Title" />
            <input {...register("Description")} placeholder="Description" />
            <input {...register("Deadline")} type="datetime-local" placeholder="Deadline" />
            <input type="submit" value="Add Task" />
        </form>
    );
}
