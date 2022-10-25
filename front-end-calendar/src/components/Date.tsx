import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Calendar, Event, User } from '../domain/entity';
import { useRouter } from 'next/router';
import { useWindowSize } from 'src/pages/api/websize'
type Props = {
	date: number
	events: Event[]
	calendar_id:string
}

const Date: React.FC<Props> = ({ date, events,calendar_id }) => {
	const router = useRouter()
	const windowSize = useWindowSize()



	const [d, setDate] = useState(0)
	const useClkickMove = (d: number) => {
		const keyword = {
			date: d,
			calendar_id:calendar_id
		}
		router.push({ pathname: 'event-edit', query: keyword })
	}

	useEffect(() => {
		if (d != 0) {
			useClkickMove(d)
		}

	}, [d])


	return (
		<>

			{date != 0 ? (
				<Card key={date} style={{ width: windowSize.width / 7, height: windowSize.height / 4 }} onClick={() => setDate(date)}>
					<Card.Body>
						<Card.Title>{date}</Card.Title>
						<Card.Text style={{  }} >

							<ul>
								{
									events.map((e: Event,index) => {
										if (e.date == date.toString()) {
											return (
												<li key={index}>{e.name}</li>	

											)
										} else {
											return (<></>)
										}
									})}
							</ul>



						</Card.Text>
					</Card.Body>
				</Card>
			) : (
				<></>
			)}
		</>

	)


}
export default Date