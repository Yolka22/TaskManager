import React from 'react';
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Input } from '@mui/joy';

export default function LoginForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    return (
        <form  className={styles.form} onSubmit={handleSubmit((data) => {
            ApiHandler.UserLogin(data, dispatch, navigate);
        })}>
            <Input {...register("Name", { required: true })} placeholder="Name" />
            <Input {...register("Password", { required: true })} placeholder="Password" />
            <Input type="submit" value="Login" />
            <a style={{textAlign:"center", textDecoration:"none", fontSize:"20px",padding:"5px"}} href='/register'>register</a>
        </form>
    );
}
