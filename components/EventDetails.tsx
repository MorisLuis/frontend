import styles from '../styles/EventDetails.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Event } from '../interfaces/Event'
import { getEvent } from '../services/events'
import { FunctionInterface } from '../interfaces/Function'

interface Props {
    serverEvent?: Event,
    serverFunctions: FunctionInterface[]
}

export const EventDetails: FC<Props> = ({ serverEvent, serverFunctions }) => {

    const router = useRouter()

    console.log({serverFunctions});
    
    const [loading, setLoading] = useState(true)

    const [functions, setFunctions] = useState<FunctionInterface[]>([])

    const [event, setEvent] = useState(serverEvent as Event)

    useEffect(() => {

        if (serverEvent && serverFunctions) return setLoading(false)

        const fetchEvent = async () => {
            console.log('fetch')
            try {
                const data = await getEvent(router.asPath.split('/')[2])
                setEvent(data.event)
                setFunctions(data.functions)
                setLoading(false)
            } catch (error) {
                setLoading(false)

            }
        }
        fetchEvent()
    }, [router.asPath])



    if (loading) return <span>Loading...</span>

    return (
        <>
            <div className={styles.date}>
                <div className={styles.right}>
                    <div className={styles.right__title}>
                        <div className={styles.icon}>X</div>
                        <p>Reserva online</p>
                    </div>

                    <p className={styles.right__subtitle}>Funciones disponibles</p>

                    {
                        functions.map((space) => (
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
                        <p className={styles.heading_secondary}>{event.name}</p>
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