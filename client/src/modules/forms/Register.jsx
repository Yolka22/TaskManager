import React, { useState } from 'react'
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';

export default function Register() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
  
    return (
      <form className={styles.form} onSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data));
        console.log(data);
        ApiHandler.UserRegister(data);
      })}>
        <input {...register("login", {required:true})} placeholder="First name" />
        <input {...register("password", {required:true})} placeholder="First name" />
        <input {...register("repeat password", {required:true})} placeholder="First name" />
        <input type="submit" />
      </form>
    );
  }