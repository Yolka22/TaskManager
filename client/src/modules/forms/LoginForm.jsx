import React from 'react';
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    return (
        <form className={styles.form} onSubmit={handleSubmit((data) => {
            ApiHandler.UserLogin(data, dispatch, navigate);
        })}>
            <input {...register("Name", { required: true })} placeholder="Name" />
            <input {...register("Password", { required: true })} placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
    );
}
