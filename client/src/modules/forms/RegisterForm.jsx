import React from 'react'
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';

export default function RegisterForm() {
    const { register, handleSubmit } = useForm();
  
    return (
      <form className={styles.form} onSubmit={handleSubmit((data) => {
        ApiHandler.UserRegister(data);
      })}>
        <input {...register("Name", {required:true})} placeholder="Name" />
        <input {...register("Password", {required:true})} placeholder="Password" />
        <input {...register("RepeatPassword", {required:true})} placeholder="Repeat Password" />
        <input type="submit" value="Register"/>
      </form>
    );
  }