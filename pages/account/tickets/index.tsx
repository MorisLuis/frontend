import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../../../components/Layouts/Layout'
import styles from '../../../styles/pages/Home.module.scss'

export default function Profile() {
    return (
        <>
            <Layout title=''>
                <p className={styles.title}>Tickets!</p>
            </Layout>
        </>
    )
}
