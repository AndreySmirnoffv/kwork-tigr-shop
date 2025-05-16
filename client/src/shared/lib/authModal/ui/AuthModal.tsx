import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './AuthModal.module.scss';
import axios from 'axios';

export const AuthModal = ({ onClose }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToAds, setAgreeToAds] = useState(false);
  const navigate = useNavigate();

  // ✅ Проверка токенов при открытии модалки
  useEffect(() => {
    const checkTokens = async () => {
      try {
      const response = await axios.get('http://localhost:8000/api/auth/check-tokens', {
        withCredentials: true,
      });

        console.log('Токены валидны:', response.data);
        if (response.status === 200) {
          navigate('/profile');
          onClose();
        }
      } catch (error) {
        console.log('Пользователь не авторизован');
      }
    };

    checkTokens();
  }, []);

  const handleToggleMode = () => {
    setIsEmailMode(prev => !prev);
    setInputValue('');
  };

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const payload = isEmailMode
      ? { email: inputValue, password }
      : { phone: inputValue, password };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        payload,
        { withCredentials: true }
      );

      console.log("axios response:", response);

      onClose();
      navigate("/profile");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Axios config:', error.config);

        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received. Request object:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }

        alert('Login failed: ' + error.message);
      } else {
        console.error('Unexpected error:', error);
        alert('Login failed: ' + String(error));
      }
    }
  };


  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();

    if (!agreeToAds) {
      alert('Пожалуйста, подтвердите согласие на рассылку.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      console.log('Успешная регистрация:', data);
      onClose();
    } catch (error: any) {
      console.error('Ошибка регистрации:', error.message || error);
      alert(error || 'Ошибка регистрации');
    }
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeButton} onClick={onClose}>×</button>
        <section className={s.titleWrapper}>
          <h2 className={s.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        </section>

        <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
          {isLogin ? (
            <label className={s.label}>
              <input
                type={isEmailMode ? 'email' : 'tel'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isEmailMode ? 'Email' : 'Телефон'}
                required
              />
            </label>
          ) : (
            <>
              <label className={s.label}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                  required
                />
              </label>

              <label className={s.label}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Введите телефон"
                  required
                />
              </label>
            </>
          )}

          <label className={s.label}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              required
              minLength={6}
            />
          </label>

          <label className={s.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreeToAds}
              onChange={() => setAgreeToAds(!agreeToAds)}
              required
            />
            <span>Согласен на обработку персональных данных</span>
          </label>
          <span>
            При регистрации вы даете согласие с нашей политикой конфиденциальности и публичной офертой
          </span>

          <button type="submit" className={s.submitButton}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className={s.switchForm}>
          {isLogin && (
            <p className={s.switchText}>
              Войти по{' '}
              <span onClick={handleToggleMode} className={s.switchLink}>
                {isEmailMode ? 'телефону' : 'email'}
              </span>
            </p>
          )}

          <p className={s.switchText}>
            {isLogin ? (
              <span onClick={() => setIsLogin(false)} className={s.switchLink}>
                Зарегистрироваться
              </span>
            ) : (
              <span onClick={() => handleLoginSubmit()} className={s.switchLink}>
                Войти
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
