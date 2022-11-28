import styles from '../styles/EventDetails.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Event } from '../interfaces/Event'
import { getEvent } from '../services/events'
import { FunctionInterface } from '../interfaces/Function'
import { getFunction } from '../services/functions'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { SpaceInterface } from '../interfaces/Space'
import { OrderConfirmationModal } from './OrderConfirmationModal'
import moment from 'moment'
import { Checkout } from './Checkout'

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

	const [currentFunction, setCurrentFunction] = useState({} as FunctionInterface)

	const [currentPage, setCurrentPage] = useState(1)

	const [functionSpaces, setFunctionSpaces] = useState<SpaceInterface[]>([])

	const [selected, setSelected] = useState<SpaceInterface[]>([])

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

	const renderColor = (space: SpaceInterface, index: number) => {

		let backgroundColor = '#e23542'

		if (selected.map(item => item._id).includes(space._id)) {
			return backgroundColor = 'black'
		}

		if (!space.isAvailable) {
			return backgroundColor = 'gray'
		}

		if (space.number === 'A-1') {
			return backgroundColor = 'yellow'
		}

		if (index === 6 || index === 7) {
			return backgroundColor = '#a8e0e6'
		}
	}

	const renderTotal = () => {

		//@ts-ignore

		let sumA = selected.filter(space => space.section === 'A').length * event?.sectionAPrice
		//@ts-ignore
		let sumB = selected.filter(space => space.section === 'B').length * event?.sectionBPrice

		return sumA + sumB
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
								<Image alt={event?.image || ''} src={
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
							{/* <div className={styles.slider}>
								<Image alt="Forum" src={"/event1.jpg"} className={styles.picture} width={300} height={200} />
							</div>
							<div className={styles.video}>
								<Image alt="Forum" src={"/event2.jpg"} className={styles.picture} width={300} height={200} />
							</div> */}
						</div>
					</div>
				)

			case 2:
				return (
					<div className={styles.functionDetails}>
						<div className={styles.functionLeft}>
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
								<div className='sectionPrice'>
									<div className="circle wheelchair"></div>
									Silla de ruedas
								</div>
								<div className='sectionPrice'>
									<div className="circle notAvailable"></div>
									No disponible
								</div>
								<div className='sectionPrice'>
									<div className="circle selected"></div>
									Selección
								</div>
								<h4>Elige tus espacios</h4>
							</div>
							<div className={styles.spaces}>
								<div className={styles.stage}>
									<span>Escenario</span>
								</div>
								<div className={styles.rowsWrapper}>
									<div className={styles.rows}>
										{
											Object.entries(renderSpaces()).map((row, index) => (
												<div
													key={row[0]}
													className={styles.row}
												>

													<div className={styles.cols}>
														<div className='leftSpaces'>
															<div style={{
																marginRight: 10
															}}>
																{row[0]}
															</div>
															{
																row[1][0].map(space =>
																	<div
																		onClick={() => {
																			if (!space.isAvailable) return
																			if (selected.map(item => item._id).includes(space._id)) {
																				setSelected(selected.filter(item => item._id !== space._id))
																			} else {
																				setSelected([...selected, space])
																			}
																		}}
																		style={{
																			backgroundColor: renderColor(space, index),
																			cursor: !space.isAvailable ? 'not-allowed' : 'pointer'
																		}}
																		className='space' key={space.number}></div>
																)
															}
														</div>
														<div
															className='rightSpaces'>
															{
																row[1][1]?.map(space =>
																	<div
																		onClick={() => {
																			if (!space.isAvailable) return
																			if (selected.map(item => item._id).includes(space._id)) {
																				setSelected(selected.filter(item => item._id !== space._id))
																			} else {
																				setSelected([...selected, space])
																			}
																		}}
																		style={{
																			backgroundColor: renderColor(space, index),
																			cursor: !space.isAvailable ? 'not-allowed' : 'pointer'
																		}}
																		className='space' key={space.number}></div>
																)

															}
														</div>
													</div>

												</div>
											))
										}
									</div>
								</div>
							</div>
						</div>

						<div className={styles.functionRight}>
							<div className={styles.subTotal}>
								<span>Asientos: {
									selected.map((space) => {
										return `${space.number}, `
									})
								}</span>
								<br />
								<span>Subtotal</span>
								<h3>${renderTotal()} MXN</h3>

							</div>

							<div className={styles.footer}>
								<button
									disabled={
										selected.length === 0
									}
									onClick={() => {
										setCurrentPage(3)
									}}
									className='btn btn-red btn-block mb-20'>Continuar</button>
								<button
									onClick={() => {
										setCurrentFunction({} as FunctionInterface)
										setCurrentPage(1)
										setSelected([])
									}}
									className='btn btn-link btn-block'>Regresar</button>
							</div>
						</div>
					</div>
				)

			case 3: return (
				<Elements stripe={stripePromise}>
					<Checkout
						setCurrentPage={setCurrentPage}
						functionId={currentFunction._id}
						setConfirmation={setConfirmation}
						event={event || {} as Event}
						currentFunction={currentFunction}
						selected={selected}
						renderTotal={renderTotal}
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
				filaA.slice(6, 15)
			],
			'B': [
				filaB.slice(0, 6),
				filaB.slice(6, 15)
			],
			'C': [
				filaC.slice(0, 6),
				filaC.slice(6, 15)
			],
			'D': [
				filaD.slice(0, 6),
				filaD.slice(6, 15)
			],
			'E': [
				filaE.slice(0, 6),
				filaE.slice(6, 15)
			],
			'F': [
				filaF.slice(0, 6),
				filaF.slice(6, 15)
			],
			'G': [
				filaG.slice(0, 6),
				filaG.slice(6, 14)
			],
			'H': [
				[...filaH]
			],
		}

		return rows

	}

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