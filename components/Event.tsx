import styles from '../styles/pages/Home.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

export const Event = ({title, image} : any) => {

    const { pathname, query } = useRouter()

    return (
        <>
            <Link
            href={{ pathname, query: { ...query, eventId: `/?eventId=event-1` } }}
            as={`/event-1`}
            >
                <div className={styles.event__item}>
                    <div className={styles.image}>
                        <Image alt="Forum" src={image} className={styles.picture} width={300} height={200} />
                    </div>

                    <div className={styles.title}>
                        <p className={styles.title__text}>{title}</p>
                        <p className={styles.title__icon}>x</p>
                    </div>
                </div>
            </Link>
        </>
    )
}