import styles from '../styles/EventDetails.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Event } from '../interfaces/Event'
import { getEvent } from '../services/events'
import { FunctionInterface } from '../interfaces/Function'
import { getFunction } from '../services/functions'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useForm } from 'react-hook-form';
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { SpaceInterface } from '../interfaces/Space'
import { OrderConfirmationModal } from './OrderConfirmationModal'
import moment from 'moment'

interface Props {
	serverEvent?: Event,
	serverFunctions?: FunctionInterface[]
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export const EventDetails: FC<Props> = ({ serverEvent, serverFunctions }) => {

	const router = useRouter()

	const [loading, setLoading] = useState(true)

	const [functions, setFunctions] = useState(serverFunctions)

	const [confirmation, setConfirmation] = useState(false)

	const [event, setEvent] = useState(serverEvent)

	const [sectionATicketCount, setSectionATicketCount] = useState(0)

	const [sectionBTicketCount, setSectionBTicketCount] = useState(0)

	const [currentFunction, setCurrentFunction] = useState({} as FunctionInterface)

	const [currentPage, setCurrentPage] = useState(1)

	const [functionSpaces, setFunctionSpaces] = useState<SpaceInterface[]>([])

	const getSpaces = () => {

		let sectionASpaces: SpaceInterface[] = []

		sectionASpaces.length = sectionATicketCount

		sectionASpaces.fill({
			price: event?.sectionAPrice || 0,
			function: currentFunction,
			isAvailable: true,
			number: 'avc',
			section: 'A'
		}
		);

		let sectionBSpaces: SpaceInterface[] = []

		sectionBSpaces.length = sectionBTicketCount

		sectionBSpaces.fill(
			{
				price: event?.sectionBPrice || 0,
				function: currentFunction,
				isAvailable: true,
				number: 'avc',
				section: 'B'
			}
		);

		return [...sectionASpaces, ...sectionBSpaces]
	}

	const rows = {
		'A': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13]
		],
		'B': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'C': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'D': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'E': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'F': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'G': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13, 14, 15]
		],
		'H': [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
		],
	}

	useEffect(() => {

		if (serverEvent && serverFunctions) return setLoading(false)

		const fetchEvent = async () => {
			try {
				const data = await getEvent(router.asPath.split('/')[2])
				setEvent(data.event)
				setFunctions(data.functions)
				setLoading(false)
			} catch (error) {
				setLoading(false)

			}
		}
		fetchEvent()
	}, [router.asPath])

	const fetchFunction = async (id: string) => {
		try {
			const data = await getFunction(id)
			setCurrentFunction(data.function)
			setFunctionSpaces(data.spaces)
			setCurrentPage(2)
		} catch (error) {

		}
	}

	const renderPage = () => {
		switch (currentPage) {
			case 1:
				return (
					<div className={styles.eventInfo}>
						<div className={styles.right}>
							<p className={styles.right__subtitle}>Funciones disponibles</p>
							{
								functions?.map((functionItem) => (
									<div
										onClick={() => {
											fetchFunction(functionItem._id)
										}}
										key={functionItem._id} className={styles.right__ticket}>
										<div className={styles.item}>
											<div className={styles.item__info}>
												<p className={styles.item__date}>
													{
														moment(functionItem.day).format('ll')
													}
												</p>
												<p className={styles.item__hour}> {
													moment(functionItem.hour, 'hh:mm').format('hh:mm a')
												}</p>
											</div>
											<div className={styles.chevron}>
												<svg
													style={{
														width: 25,
														height: 25
													}}
													xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
													<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
												</svg>
											</div>
										</div>
									</div>
								))
							}
						</div>
						<div className={styles.left}>
							<div className="section">
								<h1>{event?.name}</h1>
								<Image alt="Forum" src={
									event?.image || ''
								} className={styles.picture} width={300} height={200} />
							</div>
							<div className="section">
								<h2>Precios</h2>
								<span>Zona A: ${event?.sectionAPrice}</span>
								<span>Zona B: ${event?.sectionBPrice}</span>
							</div>
							<div className="section">
								<h2>Acerca del evento</h2>
								<span>{event?.description}</span>
							</div>
							<div className={styles.slider}>
								<Image alt="Forum" src={"/event1.jpg"} className={styles.picture} width={300} height={200} />
							</div>
							<div className={styles.video}>
								<Image alt="Forum" src={"/event2.jpg"} className={styles.picture} width={300} height={200} />
							</div>
						</div>
					</div>
				)

			case 2:
				return (
					<div className={styles.functionDetails}>
						<div className={styles.functionLeft}>
							{
								event?.type === 'No Numerado' ? <h3>Selecciona la zona</h3> : <h3>Elige tus espacios</h3>
							}
							<div className="section">
								<h3>{event?.name}</h3>
								<div className={styles.schedule}>
									<span>{moment(currentFunction.day).format('ll')}</span>
									<span>{moment(currentFunction.hour, 'hh:mm').format('hh:mm a')}</span>
								</div>
								<div className='sectionPrice'>
									<div className="circle sectionA"></div>
									Precio Zona A: ${event?.sectionAPrice} MXN
								</div>
								<div className='sectionPrice'>
									<div className="circle sectionB"></div>
									Precio Zona B: ${event?.sectionBPrice} MXN
								</div>

							</div>
							{
								event?.type === 'No Numerado' ?
									<div className={styles.spaces}>
										<div className={styles.stage}>
											<span>Escenario</span>
										</div>
										<div className={styles.rowsWrapper}>
											<div className={styles.rows}>
												{
													Object.entries(rows).map((row, index) => (
														<div
															key={row[0]}
															className={styles.row}
														>
															<div className={styles.cols}>
																<div className='leftSpaces'>
																	{
																		row[1][0].map(col =>
																			<div
																				style={{
																					backgroundColor: index === 6 || index === 7 ? 'black' : '#e23542'
																				}}
																				className='space' key={col}></div>
																		)
																	}
																</div>
																<div


																	className='rightSpaces'>
																	{
																		row[1][1]?.map(col =>
																			<div
																				style={{
																					backgroundColor: index === 6 || index === 7 ? 'black' : '#e23542'
																				}}
																				className='space' key={col}></div>
																		)

																	}
																</div>
															</div>

														</div>
													))
												}
											</div>
										</div>
									</div> :

									<div>Espacios disponibles {currentFunction.availableSpaces}

										{
											renderSpaces()
										}

									</div>
							}
						</div>

						<div className={styles.functionRight}>
							{
								event?.type === 'No Numerado' &&
								<div className={styles.buttons}>
									<div className={styles.sectionAButtons}>
										<div className={styles.details}>
											<span>Boletos Zona A</span>
										</div>
										<div className={styles.input}>
											<button
												onClick={() => {
													if (sectionATicketCount <= 0) return
													setSectionATicketCount(sectionATicketCount - 1)
												}}
											>-</button>
											<span>{sectionATicketCount}</span>
											<button
												onClick={() => {
													setSectionATicketCount(sectionATicketCount + 1)
												}}
											>+</button>
										</div>
									</div>
									<div className={styles.sectionBButtons}>
										<div className={styles.details}>
											<span>Boletos Zona B</span>
										</div>
										<div className={styles.input}>
											<button
												onClick={() => {
													if (sectionBTicketCount <= 0) return
													setSectionBTicketCount(sectionBTicketCount - 1)
												}}
											>-</button>
											<span>{sectionBTicketCount}</span>
											<button
												onClick={() => {
													setSectionBTicketCount(sectionBTicketCount + 1)
												}}
											>+</button>
										</div>
									</div>
								</div>
							}

							<div className={styles.subTotal}>
								<span>Subtotal</span>
								<h3>${
									/* @ts-ignore */
									(event?.sectionAPrice * sectionATicketCount) + (event?.sectionBPrice * sectionBTicketCount)
								} MXN</h3>
							</div>

							<div className={styles.footer}>
								<button
									disabled={
										sectionATicketCount === 0 &&
										sectionBTicketCount === 0
									}
									onClick={() => {
										setCurrentPage(3)
									}}
									className='btn btn-red btn-block'>Continuar</button>
								<button
									onClick={() => {
										setCurrentFunction({} as FunctionInterface)
										setCurrentPage(1)
									}}
									className='btn btn-link btn-block'>Regresar</button>
							</div>
						</div>
					</div>
				)

			case 3: return (
				<Elements stripe={stripePromise}>
					<Checkout
						unnumberedSpaces={getSpaces()}
						numberedSpaces={[]}
						setCurrentPage={setCurrentPage}
						functionId={currentFunction._id}
						setConfirmation={setConfirmation}
						event={event || {} as Event}
						currentFunction={currentFunction}
						ticketCount={{
							sectionATicketCount,
							sectionBTicketCount,
						}}
					/>
				</Elements>
			)
		}
	}


	const renderSpaces = () => {
		const filaA = functionSpaces.filter(space => space.number.includes('A'))
		const filaB = functionSpaces.filter(space => space.number.includes('B'))
		const filaC = functionSpaces.filter(space => space.number.includes('C'))
		const filaD = functionSpaces.filter(space => space.number.includes('D'))
		const filaE = functionSpaces.filter(space => space.number.includes('E'))
		const filaF = functionSpaces.filter(space => space.number.includes('F'))
		const filaG = functionSpaces.filter(space => space.number.includes('G'))
		const filaH = functionSpaces.filter(space => space.number.includes('H'))

		const rows = {
			'A': [
				filaA.slice(0, 6),
				filaA.slice(6, 13)
			],
			'B': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'C': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'D': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'E': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'F': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'G': [
				[1, 2, 3, 4, 5, 6],
				[7, 8, 9, 10, 11, 12, 13, 14, 15]
			],
			'H': [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			],
		}

		console.log({ rows });

		return (
			<div>
				<div className="A">
					{
						filaA.map(space => (
							<div key={space.number} className=''>{space.number}</div>
						))
					}
				</div>
			</div>
		)

	}

	renderSpaces()


	if (loading) return <span></span>

	return (
		<>
			<div className={styles.date}>
				{
					renderPage()
				}
			</div>
			{
				confirmation &&
				<OrderConfirmationModal />
			}
		</>
	)
}

const Checkout = ({ setCurrentPage, functionId, numberedSpaces, unnumberedSpaces, setConfirmation, event, currentFunction, ticketCount }:

	{
		setCurrentPage: (page: number) => void,
		functionId: string,
		numberedSpaces: any[]
		unnumberedSpaces: any[],
		setConfirmation: any,
		event: Event,
		currentFunction: FunctionInterface,
		ticketCount: any,
	}

) => {

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
				functionId,
				numberedSpaces,
				unnumberedSpaces
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
					toast.error(confirmPayment.error.message || 'Error')
					setWaiting(false)
					return
				}
				if (confirmPayment?.paymentIntent?.status === 'succeeded') {
					await api.post(`/api/orders/createOrder`, order)
					setConfirmation(true)
					setWaiting(false)
				}
			} catch (error: any) {
				toast.error(error?.response?.data?.message || 'Error')
				setWaiting(false)
			}
		}
	}
	return (
		<div className={styles.checkout}>
			<div className={styles.leftCheckout}>
				<div className="contactInfo">
					<h2>Información de contacto</h2>
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
			<div className={styles.rightCheckout}>
				<div className={styles.summary}>
					<h3>Resumen</h3>
					<div>
						<h3>{event?.name}</h3>
						<div className={styles.schedule}>
							<span>{moment(currentFunction.day).format('ll')}</span>
							<span>{moment(currentFunction.hour, 'hh:mm').format('hh:mm a')}</span>
						</div>
					</div>
					<div className={styles.selectedTickets}>
						<h3>Boletos elegidos</h3>
						<span>{ticketCount.sectionATicketCount} boleto(s) zona A</span>
						<span>{ticketCount.sectionBTicketCount} boleto(s) zona B</span>
					</div>
					<div className="section">
						<h3>Total</h3>
						<h3>${
									/* @ts-ignore */
									(event?.sectionAPrice * ticketCount.sectionATicketCount) + (event?.sectionBPrice * ticketCount.sectionBTicketCount)
								} MXN</h3>
					</div>
				</div>
			</div>
		</div>
	)
}