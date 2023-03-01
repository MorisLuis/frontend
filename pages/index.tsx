import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layouts/Layout'
import styles from '../styles/pages/Home.module.scss'
import { Modal } from '../components'

interface Props {
  events: IEvent[]
}

const Home: FC<Props> = ({ events }) => {
  const router = useRouter()
  return (
    <>
    <Layout>
      <div className='head'>
        <p className={styles.title}>Hola!!</p>
        <div className='noise'>
        </div>
        <Modal
          visible={!!router.query.slug}
          onClose={() => router.push('/', undefined, { scroll: false })}
          onCancel={() => router.push('/', undefined, { scroll: false })}
        >
          <EventDetails />
        </Modal>
      </Layout>
    </>
  )
}

export default Home