import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "./Reg.css"
function AccountPage() {
  return (

    <div>
      <div className='headeracc'>
        <h1>Ваш аккаунт</h1>
      </div>
      <div className='acc'>
        <p className=''>Пароль: </p>
        <Button variant="contained">поменять пароль</Button>
        <p>Email: </p>
        <p>Ваше имя:</p>
        <Button variant="contained" color="error">
          Удалить аккаунт
        </Button></div>

    </div>
  )

}
export default AccountPage;    