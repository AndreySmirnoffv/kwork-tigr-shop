import s from './Profile.module.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface User {
  fullName: string
  phone: string
  email: string
}

export function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleUser = async () => {
      try {
        const tokenCheckResponse = await axios.get('http://localhost:8000/api/auth/check-tokens', {
          withCredentials: true,
        })
        const userId = tokenCheckResponse.data.user.userId
        localStorage.setItem('userId', userId)

        if (!userId) {
          setError('Пользователь не авторизован')
          return
        }

        const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
          withCredentials: true,
        })

        setUser(response.data.user)
      } catch (catchError) {
        console.error('Ошибка при получении пользователя:', catchError)
        setError('Ошибка загрузки пользователя')
      }
    }

    handleUser()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:8000/api/users/logout`, {}, { withCredentials: true })
      navigate('/')
    } catch (error) {
      console.error('Ошибка выхода пользователя', error)
      setError('Ошибка выхода пользователя')
    }
  }

  return (
    <section className={s.wrapper}>
      <section className={s.topRow}>
        <h1 className={s.title}>ЛИЧНЫЙ КАБИНЕТ</h1>
        <div className={s.horizontalLine}></div>
        <section className={s.buttons}>
          <button className={s.orderHistoryButton}>
            <Link to="/history">ИСТОРИЯ ЗАКАЗОВ</Link>
          </button>
          <button className={s.logoutButton} onClick={handleLogout}>
            ВЫЙТИ
          </button>
        </section>
      </section>

      <section className={s.wrapperContent}>
        <section className={s.contentSection}>
          <section className={s.fullnameSection}>
            <div className={s.titleEditBlock}><p>ИМЯ ФАМИЛИЯ</p></div>
            <div className={s.valueText}>{user?.fullName ?? '---'}</div>
          </section>

          <section className={s.phoneSection}>
            <div className={s.titleEditBlock}><p>НОМЕР ТЕЛЕФОНА</p></div>
            <div className={s.valueText}>{user?.phone ?? '---'}</div>
          </section>

          <section className={s.mailSection}>
            <div className={s.titleEditBlock}><p>ПОЧТА</p></div>
            <div className={s.valueText}>{user?.email ?? '---'}</div>
          </section>
        </section>

        {/* Для мобилки линия и кнопки вниз */}
        <div className={s.mobileBottomLine}></div>

        <section className={s.buttonsMobile}>
          <button className={s.orderHistoryButton}>
            <Link to="/history">ИСТОРИЯ ЗАКАЗОВ</Link>
          </button>
          <button className={s.logoutButton} onClick={handleLogout}>
            ВЫЙТИ
          </button>
        </section>
      </section>
    </section>
  )
}
