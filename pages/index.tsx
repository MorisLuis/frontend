import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
  return (
    <>

    <Layout>
      <p className={styles.title}>Hola!!</p>
    </Layout>
    </>
  )
}
