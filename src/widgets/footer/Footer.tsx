import { useState } from 'react';
import s from './Footer.module.scss';
import { Link } from 'react-router-dom';

export function Footer() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <footer className={s.wrapper}>
      <div className={s.wrapperContent}>
        <div className={s.leftSections}>

          <section className={s.section}>
            <div className={`${s.title} ${s.titleSections}`} onClick={() => toggleMenu('sections')}>
              <h2>Разделы</h2>
          0    <div className={`${s.arrow} ${activeMenu === 'sections' ? s.active : ''}`} />
            </div>
            <ul className={`${s.list} ${activeMenu === 'sections' ? s.active : ''}`}>
              <li>sale</li>
              <li>обувь</li>
              <li>одежда</li>
              <li>аксессуары</li>
              <li>коллекции</li>
              <li>другое</li>
            </ul>
          </section>

          <section className={s.section}>
            <section className={s.title} onClick={() => toggleMenu('information')}>
              <h2>Информация</h2>
              <div className={`${s.arrow} ${activeMenu === 'information' ? s.active : ''}`} />
            </section>
            <ul className={`${s.list} ${activeMenu === 'information' ? s.active : ''}`}>
              <li>контакты</li>
              <li>доставка</li>
              <li>оплата</li>
              <li>возврат</li>
              <li>FAQ</li>
              <li>о нас</li>
            </ul>
          </section>
        </div>

        <section className={s.section}>
          <section className={`${s.title} ${s.titleContacts}` } onClick={() => toggleMenu('contacts')}>
            <h2>Контакты</h2>
            <div className={`${s.arrow} ${activeMenu === 'contacts' ? s.active : ''}`} />
          </section>
          <ul className={`${s.list} ${activeMenu === 'contacts' ? s.active : ''}`}>
            <li>номер</li>
            <li>часы работы</li>
            <li>vk: /ссылка/</li>
            <li>inst: /название/</li>
            <li>tg: /название/</li>
            <li>wa: /номер/</li>
          </ul>
        </section>

        <div className={s.rightSection}>
          <ul className={s.imagesSection}>
            <li className={s.firstImage}><Link to="https://google.com"><img src="/vr.png" alt="VK"/></Link></li>
            <li><Link to="#"><img src="/inst.png" alt="Instagram"/></Link></li>
            <li><Link to="#"><img src="/tg.png" alt="Telegram"/></Link></li>
            <li><Link to="#"><img src="/wa.png" alt="WhatsApp"/></Link></li>
          </ul>
        </div>
      </div>

      <section className={s.copyright}>
        <p>2018-2025 Ⓒ Tigr Shop</p>
      </section>
      <section className={s.bottomMenu}>
        <ul>
          <li><img src="/account.png" alt="" /></li>
          <li><img src="/chat.png" alt="" /></li>
          <li><img src="/basket.png" alt="" /></li>
        </ul>
      </section>
    </footer>
  );
}
