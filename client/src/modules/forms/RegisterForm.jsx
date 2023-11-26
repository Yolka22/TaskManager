import React from 'react'
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import ApiHandler from '../../API/ApiHandler';
import { Input } from '@mui/joy';
export default function RegisterForm() {
    const { register, handleSubmit } = useForm();
    return (
      <form className={styles.form} onSubmit={handleSubmit((data) => {
        ApiHandler.UserRegister(data);
      })}>
        <Input {...register("Name", {required:true})} placeholder="Name" />
        <Input {...register("Password", {required:true})} placeholder="Password" />
        <Input {...register("RepeatPassword", {required:true})} placeholder="Repeat Password" />
        <Input type="submit" value="Register"/>
        <a style={{textAlign:"center", textDecoration:"none", fontSize:"20px",padding:"5px"}} href='/'>login</a>
      </form>
    );
  }