import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Calendar, Event } from 'src/domain/entity'
import { Container, Row, Col, } from 'react-bootstrap'
import { getCalendar } from "src/pages/api/getCalendar"
import { useRouter } from 'next/router';
import Date from 'src/components/Date'
interface Props {
	calendar: number[][]
	calendar_id: string
	user_id: string
	events: Event[]
}

const EventView: React.FC<Props> = ({ calendar, calendar_id, user_id, events }) => {
	const router = useRouter()
	
	const weeks = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat']
	const onClickDate = async (context: any) => {
		context.preventDefault()
		const body = context.target
		const keyword = {
			date: body.date,
			calendar_id: calendar_id,
			user_id: user_id
		}
		router.push({ pathname: '', query: keyword })
	}
	return (
		<>
			<td>
				<tr>
					{weeks.map((d,index) => {
						return (
							<th key={index}> {d} </th>
						)
					})}
				</tr>
				{calendar.map((week,index) => {
					return (
						<tr key={index}>
							{week.map((date,index) => {
								return (
									<th key={index}>
										<Date date={date} events={events} calendar_id={calendar_id} />
									</th>
								)
							})}
						</tr>
					)
				})}
			</td>
		</>

	)
}

export default EventView