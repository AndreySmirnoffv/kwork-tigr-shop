import { Link } from 'react-router-dom';
import s from './Succeeded.module.scss';

export function Succeeded(props: any) {
    return (
       <section className={s.wrapper}>
            <section className={s.wrapperContent}>
                <section className={s.titleBlock}>
                    <section className={s.titleWrapper}>
                        <section className={s.title}>
                            <h1>ВАШ ЗАКАЗ УСПЕШНО ОПЛАЧЕН</h1>
                        </section>
                         <section className={s.subTitle}>
                            <h3>Мы свяжемся с вами в ближайшее время</h3>
                        </section>
                    </section>
                </section>
                <section className={s.contentBlock}>
                    <section className={s.contentWrapper}>
                        <section className={s.leftBlock}>
                            <section className={s.orderData}>
                                <p>Номер pаказа: {props.orderId ?? "undefined"}</p>
                                <p>Отслеживать Заказ</p>
                            </section>
                            <section className={s.toMainLink}>
                                <button>
                                    <Link to="/">НА ГЛАВНУЮ</Link>
                                </button>
                            </section>
                        </section>
                        <section className={s.rightBlock}>
                            <section className={s.questions}>
                                <p>Если у вас остались вопросы напишите нам</p>
                            </section>
                        </section>
                </section>
                    </section>
                   

            </section>
        </section>

    )
}
