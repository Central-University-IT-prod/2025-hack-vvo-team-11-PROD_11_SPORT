import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import { useEffect } from "react";
import { useState } from "react";

const LINKS = [
  { label: "Спорт.PR", href: "/" },
  { label: "Создать", href: "/makecompete" },
  { label: "Соревнования", href: "/championship" },
  { label: "Расписание игр", href: "/schedule" },
];


export const Header = () => {
  const navigate = useNavigate()
  const [nickName, setNickName] = useState(() => localStorage.getItem('nickname'))

  const handleExit = () => {
    localStorage.removeItem('nickname')
    setNickName('')
    navigate('/')

  }

  useEffect(() => {
    const nickname = localStorage.getItem('nickname')
    setNickName(nickname)
  })

  return (
    <header className="header">
      <nav>
        <ul className="list">
          {LINKS.map((link) => (
            <Link key={link.label} className="link" to={link.href}>
              {link.label}
            </Link>
          ))}
          <div className="auth">
            {!nickName ? (
              <>
                <Link className="link" to="/reg">
                  Регистрация
                </Link>
                <Link className="link" to="/sign">
                  Вход
                </Link>
              </>
            ) :
              <button className="button" onClick={handleExit}>Выход</button>
            }
          </div>
        </ul>
      </nav>
    </header>
  );
};
