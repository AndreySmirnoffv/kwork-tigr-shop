import s from './Refund.module.scss'

export function Refund(){
    return(
        <section className={s.wrapper}>
            <section className={s.topRow}>
                <h1 className={s.title}>Возврат</h1>
                <div className={s.horizontalLine}></div>
            </section>
            <section className={s.wrapperContent}>
                <section className={s.contentSection}>
                    <section className={s.title}>
                        <h1>УСЛОВИЯ ВОЗРАТА и ОБМЕНА</h1>
                    </section>
                </section>
            </section>
        </section>
    )
}