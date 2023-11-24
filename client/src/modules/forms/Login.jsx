import React, { useState } from 'react'
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';


export default function Login() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
  
    return (
      <form className={styles.form} onSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data));
        ApiHandler.UserLogin(data);
      })}>
        <input {...register("Name", {required:true})} placeholder="First name" />
        <input {...register("Password", {required:true})} placeholder="First name" />
        <input type="submit" />
      </form>
    );
}
