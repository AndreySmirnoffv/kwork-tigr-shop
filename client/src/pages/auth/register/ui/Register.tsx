import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './Register.module.scss';

export function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToAds, setAgreeToAds] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!agreeToAds) {
      alert('Пожалуйста, подтвердите согласие на рассылку.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          phone,
          password,
        }),
      });

      const data = response.json()

      console.log('Ответ сервера:', data);

      navigate('/profile')
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
};


  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>Зарегистрируйтесь на сайте</h1>
      <p className={s.subtitle}>
        Зарегистрированным пользователям доступен личный кабинет с историей заказов и возможностью сохранения адресов.
      </p>

      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          Email
          <input
            type="email"
            className={s.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
        </label>

        <label className={s.label}>
          Телефон
          <input
            type="tel"
            className={s.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите номер телефона"
          />
        </label>

        <label className={s.label}>
          Пароль
          <input
            type="password"
            className={s.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Придумайте пароль"
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

        <p className={s.notice}>
          При регистрации вы даёте согласие с нашей{' '}
          <Link to="/privacy">политикой конфиденциальности</Link> и{' '}
          <Link to="/offer">публичной офертой</Link>.
        </p>

        <button type="submit">Зарегистрироваться</button>
      </form>

      <div className={s.links} style={{ marginTop: '20px', alignItems: 'center', gap: '10px' }}>
        <Link to="/login-phone">Войти по номеру телефона</Link>
        <Link to="/login">Войти</Link>
      </div>
    </section>
  );
}
