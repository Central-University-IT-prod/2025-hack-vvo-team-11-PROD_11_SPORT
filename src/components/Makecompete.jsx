import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import "./Reg.css";

export const Makecompete = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState("");
  const [participantsCount, setParticipantsCount] = useState("");
  const [prize, setPrize] = useState("");
  const [errors, setErrors] = useState({});
  const [generalEr, setGeneralEr] = useState(false)

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleParticipantsCountChange = (event) => {
    setParticipantsCount(event.target.value);
  };

  const handlePrizeChange = (event) => {
    setPrize(event.target.value);
  };

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = "Название и дата соревнования обязательно";
    }

    if (!location) {
      errors.location = "Место проведения обязательно";
    }
    if (!sport) {
      errors.sport = "Вид спорта обязателен";
    }
    if (!participantsCount) {
      errors.participantsCount = "Количество участников обязательно";
    }
    if (!prize) {
      errors.prize = "Приз обязателен";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    if (!localStorage.getItem('nickname')) {
      setGeneralEr(true)
      return
    }

    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      name: name,
      location: location,
      sport: sport,
      participantsCount: participantsCount,
      prize: prize,
      nickname: localStorage.getItem('nickname')
    };

    try {
      const response = await fetch("http://localhost:8000/api/makecompete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'no-cors',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        navigate('/notfound')
      }

      if (response.ok) {
        setName("");
        setLocation("");
        setSport("");
        setParticipantsCount("");
        setPrize("");
        setErrors({});
      } else {
        console.error("Ошибка при создании соревнования:", response.status);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "max-content",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h1 className="heading">Создайте ваше соревнование!</h1>
      {generalEr && <p
        style={{ color: 'red', fontWeight: 700, fontSize: '1.1em', textAlign: 'center' }}
      >Ошибка при создании события</p>}
      <TextField
        fullWidth
        required
        id="name"
        label="Название соревнования и дата"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />

      <div className="rega2">
        <Box sx={{ flex: "1" }}>
          <FormControl fullWidth error={!!errors.location}>
            <InputLabel id="location-label">Место проведения</InputLabel>
            <Select
              fullWidth
              labelId="location-label"
              id="location"
              value={location}
              label="Место проведения"
              onChange={handleLocationChange}
              required
            >
              <MenuItem value="Фетисов арена">Фетисов арена</MenuItem>
              <MenuItem value="Стадион Строитель">Стадион Строитель</MenuItem>
              <MenuItem value="Стадион Авангард">Стадион Авангард</MenuItem>
            </Select>
            {errors.location && (
              <FormHelperText>{errors.location}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </div>
      <div className="rega2">
        <Box sx={{ flex: "1" }}>
          <FormControl fullWidth error={!!errors.sport}>
            <InputLabel id="sport-label">Вид спорта</InputLabel>
            <Select
              fullWidth
              labelId="sport-label"
              id="sport"
              value={sport}
              label="Вид спорта"
              onChange={handleSportChange}
              required
            >
              <MenuItem value="Теннис">Теннис</MenuItem>
              <MenuItem value="Бокс">Бокс</MenuItem>
            </Select>
            {errors.sport && <FormHelperText>{errors.sport}</FormHelperText>}
          </FormControl>
        </Box>
      </div>
      <div className="rega2">
        <Box sx={{ flex: "1" }}>
          <FormControl fullWidth error={!!errors.participantsCount}>
            <InputLabel id="participants-label">
              Количество участников
            </InputLabel>
            <Select
              labelId="participants-label"
              id="participantsCount"
              value={participantsCount}
              label="Количество участников"
              onChange={handleParticipantsCountChange}
              required
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={32}>32</MenuItem>
              <MenuItem value={64}>64</MenuItem>
            </Select>
            {errors.participantsCount && (
              <FormHelperText>{errors.participantsCount}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </div>
      <div className="rega2">
        <TextField
          fullWidth
          required
          id="prize"
          label="Приз"
          variant="outlined"
          value={prize}
          onChange={handlePrizeChange}
          error={!!errors.prize}
          helperText={errors.prize}
        />
      </div>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Зарегистрировать
      </Button>
    </div>
  );
};
