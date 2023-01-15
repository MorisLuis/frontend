import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import { Layout } from '../../../components/Layouts/Layout';
import { Order } from '../../../interfaces';
import styles from '../../../styles/Order.module.scss'

const Order = () => {

  const [order, setOrder] = useState({} as Order);

  const { query, back } = useRouter()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (query.order) {
        try {
          const { data } = await api.get(`/api/orders/${query.order}`)
          setOrder(data.order)
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      }
    }
    fetchOrder()
  }, [query])


  if (loading) return <span>Loading...</span>

  return (
    <Layout
      title='Detalles de pedido'
    >
      {/* <div className={styles.order}>
        <button onClick={back} className='btn btn-white no-border'> Regresar</button>
        <div className={styles.header}>
          <h2>Pedido {order.number}</h2>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          <span>{order.customer}</span>
        </div>

        <div className={styles.details}>
          <h3>Detalles de pedido</h3>
          <div className={styles.group}>
            <span>Estado de pedido</span>
            <span>{order.status}</span>
          </div>
          <div className={styles.group}>
            <span>Telefono</span>
            <span>{order.phone}</span>
          </div>
          <div className={styles.group}>
            <span>Direccion de entrega</span>
            <span>{order.shippingAddress.street}, {order.shippingAddress.colonia}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.state}</span>
          </div>
          <div className={styles.group}>
            <span>Productos</span>
            {
              order.cart && order.cart.items.map(product => (
                <div key={product.cartItemId} className={styles.product}>
                  <div className={styles.image}>
                    <Image alt={product.name} layout='fill' objectFit='cover' src={product.images[0]} />
                  </div>
                  <span>
                    {product.name}
                  </span>
                  <span>
                    $ {product.price} MXN
                  </span>
                </div>
              ))
            }
          </div>

        </div>
        <div className={styles.payment}>
          <div className={styles.item}>
            <span>Subtotal de articulos</span>
            <span>$ {order.subTotal} MXN</span>
          </div>
          <div className={styles.item}>
            <span>Tipo de Envío </span>
            <span>{order.shippingType.label} - $ {order.shippingFee} MXN</span>
          </div>
          {
            order.cart && order.cart.discount &&
            <div className={styles.item}>
              <span>Descuentos</span>
              <span>Código: {order.cart.discount.name}</span>
              <span>- $ {
                order.cart.discount.type.value === 'percentage' ? order.subTotal * (order.cart.discount.value / 100) : 0
              } MXN</span>
            </div>
          }
          <div className={styles.item}>
            <span>Total</span>
            <span>$ {order.total} MXN</span>
          </div>
        </div>

      </div> */}
    </Layout>
  );
};

export default Order;
