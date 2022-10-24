import React, { useState, useEffect } from 'react'
import { Container, Row, Col, } from 'react-bootstrap'
import { Event, User } from 'src/domain/entity'
import { useRouter } from 'next/router'
import DitailDate from 'src/components/DitailDate'
import EventEdit from 'src/components/EventEdit'


interface Props {

    date: number
    events: Event[]
    calendar_id: string


}
const EventEditPage: React.FC<Props> = ({ date, events, calendar_id,...pageprops }) => {
    const router = useRouter()
    const [user_name , setName] = useState(("user_name" in pageprops && pageprops.user_name!="")?(pageprops.user_name):(""))
    console.log(pageprops)
    
    //const user_name = (liff.isLoggedin())?liff.getProfile():""
    return (
        <>

            <Container>
                <Col>
                    <DitailDate events={events} date={date} user={user_name} />
                </Col>
                <Col></Col>
                <Col>
                    <EventEdit date={date} calendar_id={calendar_id} />
                </Col>
            </Container>

        </>
    )
}
export async function getServerSideProps(context: any) {
    const calendarId = context.query.calendar_id
    const date = context.query.date
    const endpoint = 'http://localhost:5000/webview/event_view'//"https://line-chat-bot-1114.herokuapp.com/webview/event_view"//
    const keyword = {
        room_id: calendarId,
    }
    const JSONdata = JSON.stringify(keyword)
    const options = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    return {
        props: {
            date: date,
            events: result.events,
            calendar_id: calendarId,

        } // will be passed to the page component as props
    }


}
export default EventEditPage