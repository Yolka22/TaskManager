import React, { useState } from 'react'
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';

import { useSelector, useDispatch } from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();
    const logUser = useSelector((state) => state.user.user);

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
  
    return (
      <form className={styles.form} onSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data));
        ApiHandler.UserLogin(data,dispatch);
        console.log(logUser);
      })}>
        <input {...register("Name", {required:true})} placeholder="Name" />
        <input {...register("Password", {required:true})} placeholder="Password" />
        <input type="submit" />
      </form>
    );
}
