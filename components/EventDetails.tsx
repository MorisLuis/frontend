import styles from '../styles/EventDetails.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Event } from '../interfaces/Event'
import { getEvent } from '../services/events'
import { FunctionInterface } from '../interfaces/Function'
import { getFunction } from '../services/functions'

interface Props {
	serverEvent?: Event,
	serverFunctions?: FunctionInterface[]
}

export const EventDetails: FC<Props> = ({ serverEvent, serverFunctions }) => {

	const router = useRouter()

	const [loading, setLoading] = useState(true)

	const [functions, setFunctions] = useState(serverFunctions)

	const [event, setEvent] = useState(serverEvent)

	const [currentFunction, setCurrentFunction] = useState({} as FunctionInterface)

	const rows = {
		'A': [
			[1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13]
		],
		'B': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'C': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'D': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'E': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'F': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'G': [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		],
		'H': [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
		],
	}

	console.log()

	useEffect(() => {

		if (serverEvent && serverFunctions) return setLoading(false)

		const fetchEvent = async () => {
			console.log('fetch')
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
		} catch (error) {

		}
	}

	Object.entries(rows).map(row => console.log(row[1][0]
	))

	if (loading) return <span>Loading...</span>

	return (
		<>
			<div className={styles.date}>
				{
					currentFunction._id ?

						<div>
							<button>Regresar</button>
							{
								event?.type === 'No Numerado' ? <h3>Selecciona la zona</h3> : <h3>Elige tus espacios</h3>
							}
							<div className="section">
								<h3>{event?.name}</h3>
								<span>{currentFunction.day}</span>
								<span>{currentFunction.hour}</span>
							</div>
							<div className={styles.spaces}>
								<div className={styles.stage}>
									<span>Escenario</span>
								</div>
								<div className={styles.rows}>
									{
										Object.entries(rows).map((row, index) => (
											<div
												style={{

												}}
												key={row[0]} className={styles.row}>{row[0]}
												<div className={styles.cols}>
													<div className='leftSpaces'>
														{
															row[1][0].map(col =>
																<div
																	style={{
																		backgroundColor: index === 6 || index === 7 ? 'black' : 'red'
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
																		backgroundColor: index === 6 || index === 7 ? 'black' : 'red'
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
						</div>
						:
						<>
							<div className={styles.right}>
								<div className={styles.right__title}>
									<div className={styles.icon}>X</div>
									<p>Reserva online</p>
								</div>

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
													<p className={styles.item__date}> {functionItem.day}</p>
													<p className={styles.item__hour}> {functionItem.hour}</p>
												</div>

												<div className={styles.item__icon}>
													{`>`}
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
						</>
				}
			</div>
		</>
	)
}