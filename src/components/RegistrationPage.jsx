import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import './Reg.css';

export const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, email: null }));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, name: null }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, password: null }));
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Неверный формат email";
    }

    if (!name) {
      errors.name = "Имя обязательно";
    }

    if (!password) {
      errors.password = "Пароль обязателен";
    } else if (password.length < 6) {
      errors.password = "Пароль должен содержать не менее 6 символов";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendJSON = async (event) => {
    event.preventDefault();
    localStorage.setItem('nickname', name)

    if (!validateForm()) {
      return;
    }

    try {
      const requestBody = {
        email: email,
        name: name,
        password: password,
      };

      const jsonData = JSON.stringify(requestBody);

      const response = await fetch("http://RETRACTED:443/api/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
        mode: 'no-cors'
      });
      const data = await response.json()
      if (!response.ok) {
        navigate('/notfound')
      }
      if (data.success) {
        navigate('/')
        localStorage.setItem('nickname', name);
      } else {
        setErrors({ general: data.message || "Ошибка регистрации." })
        console.error("Ошибка регистрации:", data);
      }
    } catch (error) {
      setErrors({ general: "Произошла ошибка при отправке запроса: " + error.message });
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <div className="main-page1">
      <div className="main-container1">
        <div className="regpol">
          <h1 className="font-button" style={{ marginBottom: "10px" }}>
            Добро пожаловать, зарегистрируйтесь!
          </h1>
          <Box
            width="100%"
            display="flex"
            gap="10px"
            maxWidth="600px"
            flexDirection="column"
            component="form"
            onSubmit={sendJSON}
            autoComplete="off"
          >
            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email || ""}
              required
            />
            <TextField
              type="text"
              id="name"
              label="Ваше имя"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              error={!!errors.name}
              helperText={errors.name || ""}
              required
            />
            <TextField
              type="password"
              id="password"
              label="Пароль"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password || ""}
              required
            />
            <Button type="submit" variant="contained">
              Зарегистрироваться
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
