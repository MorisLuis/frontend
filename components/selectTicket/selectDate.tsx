import styles from '../../styles/pages/Date.module.scss'
import Image from 'next/image'

export const Date = () => {

    const spaces = [
        {
            date : "Lunes 27 Noviembre",
            hour : "9:00PM"
        },
        {
            date : "Martes 28 Noviembre",
            hour : "9:00PM"
        }
    ]

    return (
        <>
            <div className={styles.date}>
                <div className={styles.right}>
                    <div className={styles.right__title}>
                        <div className={styles.icon}>X</div>
                        <p>Reserva online</p>
                    </div>
                    
                    <p className={styles.right__subtitle}>Selecciona la fecha</p>

                    {
                        spaces.map( (space) => (
                            <div className={styles.right__ticket}>
                                <div className={styles.item}>
                                    <div className={styles.item__info}>
                                        <p className={styles.item__date}> {space.date}</p>
                                        <p className={styles.item__hour}> {space.hour}</p>
                                    </div>

                                    <div className={styles.item__icon}>
                                        x
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className={styles.left}>
                    <div className={styles.left__title}>
                        <p className={styles.heading_secondary}>Cuentos que no son cuentos</p>
                    </div>

                    <div className={styles.left__front}>
                        <Image alt="Forum" src={"/event1.jpg"} className={styles.picture} width={300} height={200} />
                    </div>

                    <div className={styles.about}>
                        <div className={styles.about__title}>
                            <p className={styles.heading_secondary}>
                            Sobre el evento
                            </p>
                        </div>
                        <div className={styles.about__paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, repudiandae voluptates deserunt culpa, officiis hic commodi debitis, voluptatem porro et vitae vero molestias aperiam odio? Magnam excepturi recusandae error cum?</div>
                    </div>

                    <div className={styles.slider}>
                        <Image alt="Forum" src={"/event1.jpg"} className={styles.picture} width={300} height={200} />
                    </div>

                    <div className={styles.video}>
                        <Image alt="Forum" src={"/event2.jpg"} className={styles.picture} width={300} height={200} />
                    </div>
                </div>  
            </div>
        </>
    )
}