import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layouts/Layout'
import styles from '../styles/pages/Home.module.scss'

const Home = () => {
  return (
    <>

    <Layout>
      <div className='head'>
        <p className={styles.title}>Hola!!</p>
        <div className='noise'>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Home