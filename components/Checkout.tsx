import styles from '../styles/EventDetails.module.scss'
import { useContext, useState } from 'react'
import { Event } from '../interfaces/Event'
import { FunctionInterface } from '../interfaces/Function'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form';
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { SpaceInterface } from '../interfaces/Space'
import moment from 'moment'
import { AuthContext } from '../context/auth'

export const Checkout = ({ setCurrentPage, functionId, setConfirmation, event, currentFunction, selected, renderTotal }:

	{
		setCurrentPage: (page: number) => void,
		functionId: string,
		setConfirmation: any,
		event: Event,
		currentFunction: FunctionInterface,
		selected: SpaceInterface[],
		renderTotal: () => number
	}

) => {

	const { user } = useContext(AuthContext)

	const elements = useElements()

	const stripe = useStripe()

	const { register, handleSubmit, formState: { errors } } = useForm();

	const [waiting, setWaiting] = useState(false)

	const onSubmit = async (values: any) => {
		setWaiting(true)
		const cardElement = elements?.getElement(CardElement)
		if (cardElement) {
			const order = {
				...values,
				name: user.name || values.name,
				email: user.email || values.email,
				phone: user.phone || values.phone,
				functionId,
				numberedSpaces: selected.map(space => space._id),
			}
			try {
				const { data } = await api.post(`/api/orders/stripePayment`, order)
				const confirmPayment = await stripe?.confirmCardPayment(data.client_secret, {
					payment_method: {
						card: cardElement,
						billing_details: {
							name: values.cardName,
							email: values.email,
							phone: values.phone,
						}
					}
				})
				if (confirmPayment?.error) {
					toast.error(confirmPayment.error.message || 'Error', {
						duration: 6000
					})
					setWaiting(false)
					return
				}
				if (confirmPayment?.paymentIntent?.status === 'succeeded') {
					await api.post(`/api/orders/createOrder`, order)
					setConfirmation(true)
					setWaiting(false)
				}
			} catch (error: any) {
				toast.error(error?.response?.data?.message || 'Error', {
					duration: 6000
				})
				setWaiting(false)
			}
		}
	}
	return (
		<div className={styles.checkout}>
			<div className={styles.leftCheckout}>
				<div className={styles.summary}>
					<h2>Resumen</h2>
					<div>
						<h3>{event?.name}</h3>
						<div className={styles.schedule}>
							<span>{moment(currentFunction.day).format('ll')}</span>
							<span>{moment(currentFunction.hour, 'hh:mm').format('hh:mm a')}</span>
						</div>
					</div>
					<div className={styles.subTotal}>
						<span>Asientos: {
							selected.map((space, index) => {
								return `${space.number}, `
							})
						}</span>
						<br />
						<span>Subtotal</span>
						<h3>${renderTotal()} MXN</h3>

					</div>
				</div>
				<br />
			</div>
			<div className={styles.rightCheckout}>
				<div className="contactInfo">
					<h2>Información de contacto</h2>
					{
						user.token ? <div>
							<div className="group">
								<span>Nombre: {user.name}</span>
							</div>
							<div className="group">
								<span>Correo: {user.email}</span>
							</div>
							<div className="group">
								<span>Telefono: {user.phone}</span>
							</div>
						</div> :
							<div className="fields">
								<div className="group">
									<input
										className='input'
										placeholder='Nombre y apellido' type="text"
										{...register('name', {
											required: true
										})}
									/>
									{
										errors.name &&
										<span className="error">Requerido</span>
									}
								</div>
								<div className="group">
									<input
										className='input'
										placeholder='Correo electrónico' type="email"
										{...register('email', {
											required: true
										})}
									/>
									{
										errors.email &&
										<span className="error">Requerido</span>
									}
								</div>
								<div className="group">
									<input
										className='input'
										placeholder='Teléfono'
										type="text"
										{...register('phone', {
											required: true
										})}
									/>
									{
										errors.phone &&
										<span className="error">Requerido</span>
									}
								</div>
							</div>
					}
				</div>
				<div className="paymentInfo">
					<h2>Método de pago</h2>
					<div className="group">
						<input
							className='input'
							placeholder='Nombre completo del titular' type="text"
							{...register('cardName', {
								required: true
							})}
						/>
						{
							errors.phone &&
							<span className="error">Requerido</span>
						}
					</div>
					<div className={styles.card}>
						<CardElement options={{
							style: {
								base: {
									fontSize: '16px'
								}
							}
						}}
						/>
					</div>
				</div>
				<div className={styles.footer}>
					<button disabled={waiting}
						onClick={handleSubmit(onSubmit)}
						className='btn btn-red btn-block'>Finalizar compra</button>
					<button disabled={waiting}
						onClick={() => {
							setCurrentPage(2)
						}}
						className='btn btn-link btn-block'>Regresar</button>
				</div>
			</div>

		</div>
	)
}