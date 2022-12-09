import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Layout } from '../components/Layouts/Layout'
import { Event } from '../components/Event'
import { EventDetails } from '../components/EventDetails'
import { Event as IEvent } from '../interfaces/Event'
import { getEvents } from '../services/events'
import styles from '../styles/pages/Home.module.scss'
import { Modal } from '../components'

interface Props {
  events: IEvent[]
}

const Home: FC<Props> = ({ events }) => {

  const [page, setPage] = useState(0)

  const router = useRouter()

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <EventDetails />
      default:
        return <></>
    }
  }

  return (
    <>
      <Layout title='Cartelera'>
        <div className={styles.event}>
          <div className={styles.event__top}>
            <p className={styles.heading_primary}>Eventos</p>
          </div>
          <div className={styles.eventsGrid}>
            {
              events.map((event) => (
                <Event key={event._id} {...event} />
              ))
            }
          </div>
        </div>
        <Modal
          visible={!!router.query.slug}
          onClose={() => router.push('/', undefined, { scroll: false })}
          onCancel={() => router.push('/', undefined, { scroll: false })}
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
