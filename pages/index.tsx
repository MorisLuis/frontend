import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Layout, Modal } from '../components'
import { Payment } from '../components/selectTicket/payment'
import { Date } from '../components/selectTicket/selectDate'
import { Place } from '../components/selectTicket/selectPlace'
import { Event } from '../interfaces/Event'
import { getEvents } from '../services/events'
import styles from '../styles/pages/Home.module.scss'

interface Props {
  events: Event[]
}

const Home: FC<Props> = ({ events }) => {

  console.log({events});

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

  const router = useRouter()

  return (
    <>
      <Layout title='Cartelera'>
        <div className={styles.event}>
          <div className={styles.event__top}>
            <p className={styles.heading_primary}>Eventos</p>
          </div>
          {
            events.map( (event) => (
              <div key={event._id} className={styles.event__item}>
                <div className={styles.image}>
                  <Image alt="Forum" src={event.image} className={styles.picture} width={300} height={200} />
                </div>

                <div className={styles.title}>
                  <p className={styles.title__text}>{event.name}</p>
                  <p className={styles.title__icon}>x</p>
                </div>
              </div>
            ))
          }
        </div>
        <Modal
        visible={!!router.query.eventId}
        >
          {pageDisplay()}
        </Modal>
      </Layout>
    </>
  )
}

export default Home


export const getServerSideProps = async () => {

  let data

  try {
    data = await getEvents()
  } catch (error) {
    console.log(error);
  }


  return {
    props: {
      events: data.events
    }
  }
}
