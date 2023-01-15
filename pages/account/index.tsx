import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../api/api'
import { Layout } from '../../components/Layouts/Layout'
import Input from '../../components/Input'
import { AuthContext } from '../../context/auth'
import { User, Order } from '../../interfaces/'
import styles from '../../styles/Account.module.scss'

const Account = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const { user, setUser } = useContext(AuthContext)

    const [editing, setEditing] = useState(false);

    const [orders, setOrders] = useState<Order[]>([]);

    const { query, replace } = useRouter()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (user.id) {
                try {
                    const { data } = await api.get(`/api/orders?customer=${user.id}`)
                    setOrders(data.orders)
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                }
            }
        }
        fetchData()
    }, [user])

    const logOut = () => {
        setUser({} as User)
        localStorage.removeItem('token')
        replace('/')
    }

    if (loading) return <span></span>

    return (
        <Layout title='Mi cuenta'>
            <div className={styles.account}>
                <div className={styles.topbar}>
                    <Link
                        href='/account'
                    >
                        Perfil
                    </Link>
                    <Link
                        href={{ pathname: '/account', query: { tab: 'orders' } }}
                    >
                        Mis boletos
                    </Link>

                </div>
                <div className={styles.content}>
                    {
                        (query.tab === 'profile' || !query.tab) &&
                        <div className={styles.profile}>
                            <div className={styles.header}>
                                <div className={styles.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                {
                                    !editing &&
                                    <button onClick={() => {
                                        setEditing(true)
                                    }} className='btn btn-black'>Editar</button>
                                }
                                {
                                    editing &&
                                    <div>
                                        <button onClick={() => {
                                            setEditing(false)
                                        }} className='btn btn-white'>Cancelar</button>
                                        <button onClick={() => {
                                            setEditing(true)
                                        }} className='btn btn-black'>Guardar</button>
                                    </div>
                                }
                            </div>
                            <div className={styles.fields}>
                                <div className={styles.group}>
                                    <label htmlFor="">Nombre</label>
                                    <Input disabled={!editing} name='name' defaultValue={user.name} register={register} />
                                </div>
                                <div className={styles.group}>
                                    <label htmlFor="">Correo electrónico</label>
                                    <Input disabled={!editing} name='email' defaultValue={user.email} register={register} />
                                </div>
                                <div className={styles.group}>
                                    <button
                                        onClick={logOut}
                                        className='btn btn-black'>Cerrar sesión</button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        query.tab === 'orders' &&
                        <div className="orders">
                            {
                                orders.length === 0 ?
                                    <div className='empty'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                        </svg>

                                        <h2>No hay boletos comprados aún</h2>
                                        <Link className="btn btn-red btn-block" href='/'>
                                            Explorar cartelera
                                        </Link>
                                    </div> :
                                    <div className={styles.orderList}>
                                        <h3>Historial de compras</h3>
                                        <table className={styles.table}>
                                            <thead className={styles.header}>
                                                <tr>
                                                    <th>No. de pedido</th>
                                                    <th>Fecha</th>
                                                    <th>Estado</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className={styles.data}>
                                                {
                                                    orders.map(order => (
                                                        <tr className={styles.row} key={order.number}>
                                                            <td>
                                                                <Link
                                                                    href={`/account/orders/${order.number}`}
                                                                >

                                                                    {order.number}

                                                                </Link>
                                                            </td>
                                                            {/* <td>{new Date(order.createdAt).toLocaleDateString()}</td> */}
                                                            <td>${order.total} MXN</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>


                                    </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Account
