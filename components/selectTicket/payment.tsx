import styles from "../../styles/pages/Payment.module.scss"

export const Payment = () => {

    return(
        <>
            <div className={styles.payment}>
                <div className={styles.right}>
                    Subtotal : $ 450 MXN
                </div>

                <div className={styles.left}>
                    <div className={styles.contact}>
                        <div className={styles.contact__title}>
                            <p className={styles.heading_secondary}>Informacion de contacto</p>
                        </div>

                        <div className={styles.contact__form}>
                            <input type="text" className={styles.input} placeholder="Nombre y apellido"/>
                            <input type="text" className={styles.input} placeholder="Correo electronico"/>
                            <input type="text" className={styles.input} placeholder="Telefono"/>
                        </div>

                        <div className={styles.contact__login}>
                            <p className={styles.login__account}>Ya tienes una cuenta</p>
                            <p className={styles.login__session}>Iniciar sesion</p>
                        </div>

                        <button className={styles.button__primary}>Continuar con metodo de pago</button>
                    </div>

                    <div className={styles.method}>
                        <div className={styles.method__title}>
                            <p className={styles.heading_secondary}>Metodo de pago</p>
                        </div>

                        <div className={styles.method__form}>
                            <input type="text" className={styles.input} placeholder="Nombre del titular"/>
                            <input type="text" className={styles.input} placeholder="Card Number"/>
                        </div>

                        <button className={styles.button__primary}>Completar compra</button>
                    </div>


                </div>
            </div>
        </>
    )
}