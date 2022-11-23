import styles from "../../styles/pages/Spaces.module.scss"

export const Place = () => {

    return(
        <>
            <div className={styles.place}>
                <div className={styles.right}>
                    places
                </div>

                <div className={styles.left}>
                    <div className={styles.left__title}>
                        <p className={styles.heading_secondary}>Selecciona la zona</p>
                    </div>

                    <div className={styles.left__map}>
                        Escenario
                    </div>

                    <div className={styles.left__tickets}>
                        <div className={styles.zona}>
                            <div className={styles.zona__title}>
                                <p>Boletos Zona A</p>
                                <p>$ 450 MXN</p>
                            </div>

                            <div className={styles.zona__counter}>
                                <div className={styles.button}>-</div>
                                <div className={styles.number}>0</div>
                                <div className={styles.button}>+</div>
                                <div className={styles.symbol}></div>
                            </div>
                        </div>

                        <div className={styles.zona}>
                            <div className={styles.zona__title}>
                                <p>Boletos Zona B</p>
                                <p>$ 300 MXN</p>
                            </div>

                            <div className={styles.zona__counter}>
                                <div className={styles.button}>-</div>
                                <div className={styles.number}>0</div>
                                <div className={styles.button}>+</div>
                                <div className={styles.symbol}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}