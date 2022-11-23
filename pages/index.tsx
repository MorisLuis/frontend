import Image from 'next/image'
import { useState } from 'react'
import { Layout, Modal } from '../components'
import { Payment } from '../components/selectTicket/payment'
import { Date } from '../components/selectTicket/selectDate'
import { Place } from '../components/selectTicket/selectPlace'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {

  const event = [
    {
      title: "Cuentos que no son cuentos",
      image: "/event1.jpg"
    },
    {
      title: "Cuentos de navidad",
      image: "/event2.jpg"
    },
    {
      title: "Batman y robin",
      image: "/event1.jpg"
    }
  ]

  const [page, setPage] = useState(0)

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <Date />
      case 1:
        return <Place />
      case 2:
        return <Payment />
      default:
        <></>
    }
  }

  return (
    <>
      <Layout>
        <div className={styles.event}>

          <div className={styles.event__top}>
              <p className={styles.heading_primary}>Eventos</p>
          </div>
          {
            event.map( (event) => (
              <div className={styles.event__item}>
                <div className={styles.image}>
                  <Image alt="Forum" src={event.image} className={styles.picture} width={300} height={200} />
                </div>

                <div className={styles.title}>
                  <p className={styles.title__text}>{event.title}</p>
                  <p className={styles.title__icon}>x</p>
                </div>
              </div>
            ))
          }

        </div>
      </Layout>

      <Modal setPage={setPage}>
        {pageDisplay()}
      </Modal>
    </>
  )
}
