import React from 'react';
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { useDispatch,useSelector } from 'react-redux';

import { Box, Input, Textarea, Typography } from '@mui/joy';

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
            <Input sx={inputSx} {...register("Title", { required: true })} placeholder="Title" />
            <Input sx={inputSx} {...register("Description")} placeholder="Description" />
            <Input sx={inputSx} {...register("Deadline")} type="datetime-local" placeholder="Deadline" />
            <Textarea minRows={3} sx={inputSx} {...register("Comment")} placeholder="Comment" />
            <Box sx={{display:"flex",alignItems:"center"}}>
                <Typography>Priority</Typography>
                <Input sx={inputSx} {...register("Priority")} type="number"/>
            </Box>
           
            <Input sx={inputSx} type="submit" value="Add Task" />
        </form>
    );
}

const inputSx = {
    margin:"5px"
}