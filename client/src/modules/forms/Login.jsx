import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const logUser = useSelector((state) => state.user.logedUser);
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    useEffect(() => {
        console.log(logUser);
    }, [logUser]);

    return (
        <form className={styles.form} onSubmit={handleSubmit((data) => {
            setData(JSON.stringify(data));
            ApiHandler.UserLogin(data, dispatch, navigate);
        })}>
            <input {...register("Name", { required: true })} placeholder="Name" />
            <input {...register("Password", { required: true })} placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
    );
}
