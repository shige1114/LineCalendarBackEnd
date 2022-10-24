import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Calendar, Event, User } from 'src/domain/entity'
import { Container, Row, Col, } from 'react-bootstrap'
import VoteButton from './VoteBottun';

interface Props {
    events: Event[]
    date: number
    user: string
}

const ViewCalendar: React.FC<Props> = ({ events, date, user }) => {
    const [has_event, setHasEvent] = useState(false)
    return (
        <>
            <h1>{date}日</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((e: Event,index) => {
                        {
                            if (e.date == date.toString()) {
                                ()=>setHasEvent(true)
                                return (
                                    <li key={index}>
                                        <p>時間：{e.start_time}~{e.end_time}</p>
                                        <p>名前：{e.name}</p>
                                        <VoteButton event={e} member={user}/>
                                    </li>

                                )
                            } else {
                                return (
                                    <></>
                                )
                            }
                        }
                    })}
                </ul>
                

            ) : (
                <></>
            )}
            {has_event ? (
                <></>
            ):(
                <h5>None Event</h5>
            )}
        </>
    )
}

export default ViewCalendar