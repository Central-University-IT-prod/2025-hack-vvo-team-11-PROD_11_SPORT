import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Объект для хранения ошибок
  const [generalError, setGeneralError] = useState(""); // Для общих ошибок
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, email: null })); // Сброс ошибки
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, password: null })); // Сброс ошибки
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Проверка формата email
      errors.email = "Неверный формат email";
    }

    if (!password) {
      errors.password = "Пароль обязателен";
    }

    setErrors(errors); // Обновляем состояние ошибок

    return Object.keys(errors).length === 0; // Возвращаем true, если ошибок нет
  };


  const sendJSON = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setGeneralError("Пожалуйста, исправьте ошибки в форме."); //Общая ошибка
      return;
    }
    setGeneralError(""); //очищает общую ошибку, если валидация прошла

    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const jsonData = JSON.stringify(requestBody);

      const response = await fetch("http://RETRACTED:443/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
      );
      const data = await response.json();
      if (!response.ok) {
        navigate('/notfound')
      }

      if (response.ok) {
        navigate('/')
      }

    } catch (error) {
      setGeneralError("Произошла ошибка при отправке запроса: " + error.message);
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <>
      <div className="main-page1">
        <div className="main-container1">
          <div className="regpol">
            <h1 style={{ marginBottom: "10px" }} className="font-button">
              Добро пожаловать, Войдите
            </h1>
            <Box
              width="100%"
              display="flex"
              gap="10px"
              flexDirection="column"
              component="form"
              autoComplete="off"
              onSubmit={sendJSON}
              className="wrapper"
            >
              {generalError && <p style={{ color: "red", textAlign: 'center', fontWeight: 700, fontSize: '1.1em' }}>Ошибка  авторизации, попробуйте еще раз</p>}

              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"

                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}  // Преобразуем в boolean для MUI
                helperText={errors.email || ""}  // Отображаем текст ошибки
              />

              <TextField
                type="password"
                id="password"
                label="Пароль"
                variant="outlined"

                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}  // Преобразуем в boolean для MUI
                helperText={errors.password || ""}  // Отображаем текст ошибки
              />

              <Button fullWidth type="submit" variant="contained">
                Войти
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
