import React, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
export const Championship = () => {

  const [isParticipating, setIsParticipating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('nickname'));
  const navigate = useNavigate()

  const sport = "Теннис";
  const eventName = "Открытый чемпионат Австралии";
  const dateTime = "27 января, 20:00";
  const prizeMoney = "5,000,000$";
  const isUserAuthenticated = () => {
    const token = localStorage.getItem("nickname");
    return !!token;
  };

  useEffect(() => {
    const authStatus = isUserAuthenticated();
    setIsAuthenticated(authStatus);
    if (authStatus) {
      const storedValue = localStorage.getItem("isParticipating");
      setIsParticipating(storedValue === "true" || false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isParticipating", isParticipating);
    } else {
      localStorage.removeItem("isParticipating");
    }
  }, [isParticipating, isAuthenticated]);

  const handleParticipateClick = (e) => {
    e.preventDefault();
    setIsParticipating(true);
  };

  const handleLoginClick = () => {
    window.location.href = "/reg";
  };

  const [comps, setComps] = useState([])
  console.log(comps)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://RETRACTED:443/api/comps')

      if (!response.ok) {
        navigate('/notfound')
      }

      const data = await response.json()
      setComps(data)
    }
    fetchData()

  }, [])

  return (
    <div className="champ-wrapper">
      {comps?.length ? comps.map((comp, idx) => (
        <div key={idx} className="card-container">
          <div className="card-content">
            <div className="card-header">
              <span className="card-sport">{comp.sport}</span>
            </div>
            <h2 className="card-title">{comp.title}</h2>
            <h5>{`Участников: ${comp.participantsCount}`}</h5>
            <p className="card-details">
              {dateTime}, Приз: {comp.prize}
            </p>
            {isAuthenticated ? (
              isParticipating ? (
                <span className="card-participating">Вы участвуете</span>
              ) : (
                <a
                  href="#"
                  className="card-link"
                  onClick={handleParticipateClick}
                  style={{ maxWidth: 'max-content' }}
                >
                  Участвовать
                </a>
              )
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="card-login-button" onClick={handleLoginClick}>
                  Войти, чтобы участвовать

                </button>
                <span style={{ color: 'black', fontWeight: 700 }}>{`Победитель: Участник номер: ${Math.floor(Math.random() * 100)}`}</span>
              </div>
            )}
          </div>
          <img src="./images/tennis.jpeg" alt="Теннис" />
        </div>
      )) : []}
    </div>
  );
};
