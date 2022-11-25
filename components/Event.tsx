import styles from '../styles/pages/Home.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Event as IEvent } from '../interfaces/Event'

export const Event: FC<IEvent> = ({ name, image, slug }) => {

    const { pathname, query } = useRouter()

    return (
        <>
            <Link
                scroll={false}
                shallow
                href={{ pathname, query: { ...query, slug: `/events?slug=${slug}` } }}
                as={`/events/${slug}`}
            >
                <div className={styles.event__item}>
                    <div className={styles.image}>
                        <Image alt="Forum" src={image} className={styles.picture} width={300} height={200} />
                    </div>

                    <div className={styles.title}>
                        <p className={styles.title__text}>{name}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}