import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './Login.module.scss';

export function Login() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToAds, setAgreeToAds] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsEmailMode((prev) => !prev);
    setInputValue('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToAds) {
      alert('Пожалуйста, подтвердите согласие на рассылку.');
      return;
    }

    try {
      const payload = {
        password,
        ...(isEmailMode ? { email: inputValue } : { phone: inputValue }),
      };

      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка при авторизации: ${errorText}`);
      }

      const data = await response.json();
      console.log('Ответ сервера:', data);

      navigate('/profile'); 

    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>Вход на сайт</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          {isEmailMode ? 'Email' : 'Телефон'}
          <input
            type={isEmailMode ? 'email' : 'tel'}
            className={s.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isEmailMode ? 'Введите email' : 'Введите номер телефона'}
          />
        </label>

        <label className={s.label}>
          Пароль
          <input
            type="password"
            className={s.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </label>

        <label className={s.checkbox}>
          <input
            type="checkbox"
            checked={agreeToAds}
            onChange={() => setAgreeToAds(!agreeToAds)}
          />
          Согласен(-а) на получение рекламно-информационной рассылки
        </label>

        <button type="submit">Войти</button>
      </form>

      <div className={s.links}>
        <Link to="#" onClick={(e) => { e.preventDefault(); handleToggleMode(); }}>
          {isEmailMode ? 'Войти по номеру телефона' : 'Войти по email'}
        </Link>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
    </section>
  );
}
