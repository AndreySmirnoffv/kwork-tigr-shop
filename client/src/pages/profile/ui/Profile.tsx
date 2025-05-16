import { useState, useEffect } from 'react'
import s from './Profile.module.scss'
import axios from 'axios'

interface User {
  fullName: string
  phone: string
  email: string
}

export function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleUser = async () => {
      try {
        const tokenCheckResponse = await axios.get('http://localhost:8000/api/auth/check-tokens', {
          withCredentials: true,
        })
        const userId = tokenCheckResponse.data.user.userId

        console.log(userId)
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`,  { withCredentials: true })
        
        if (!userId) {
          setError("Пользователь не авторизован")
          return
        }
        setUser(response.data.user)
      } catch (error) {
        console.error("Ошибка при получении пользователя:", error)
        setError("Ошибка загрузки пользователя")
      }
    }

    const handleLogout = async () => {}

    handleUser()
  }, [])

  return (
    <section className={s.wrapper}>
      <section className={s.wrapperContent}>
        <section className={s.titleSection}>
          <section className={s.title}>
            <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
          </section>
          <section className={s.lineSection}></section>
          <section className={s.buttonsSection}>
            <section className={s.buttons}>
              <button className={s.orderHistoryButton}>ИСТОРИЯ ЗАКАЗОВ</button>
              <button className={s.logoutButton}>ВЫЙТИ</button>
            </section>
          </section>
        </section>
        <section className={s.contentSection}>
          <section className={s.fullnameSection}>
            <p>Имя, Фамилия</p>
            <p>{user?.fullName ?? '—'}</p>
          </section>
          <section className={s.phoneSection}>
            <p>Номер Телефона</p>
            <p>{user?.phone ?? '—'}</p>
          </section>
          <section className={s.mailSection}>
            <p>Почта</p>
            <p>{user?.email || '—'}</p>
          </section>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
      </section>
    </section>
  )
}
