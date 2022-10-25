import React, { useEffect, useState } from 'react'
import { Event } from 'src/domain/entity'
import { getCalendar } from "src/pages/api/getCalendar"
import EventView from 'src/components/EventView';
import { LineContext } from 'src/domain/context';
import { useContext } from 'react';
interface Props {
    error: Boolean | null
    calendar_id: string
    user_id: string
    events: Event[]
    calendar: number[][]
}
const EventViewPage: React.FC = () => {
    const { groupId } = useContext(LineContext)
    const [calendarNum, setCalendarNum] = useState<number[][]>([])
    const [events, setEvents] = useState<Event[]>([])
    const options = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ room_id: groupId })
    }
    useEffect(() => {
        async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_EVENT_VIEW as string, options)
            const result = await response.json()
            setCalendarNum(getCalendar("2022" + "-" + result.calendar["month"]))
            setEvents(result.events)
        }
    },[])

    return (
        <>
            <EventView
                calendar={calendarNum}
                calendar_id={groupId}
                events={events}
            />
        </>

    )


}
/*
export async function getServerSideProps(context: any) {
    const roomId = 'jfladjfa'//(context.query.room_id != null)?context.query.room_id : ''
    console.log(roomId)
    const endpoint ="http://localhost:5000/webview/event_view"// 'https://line-chat-bot-1114.herokuapp.com/webview/event_view'//
    const keyword = {
        room_id: roomId,
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

    const calendar_num = getCalendar("2022" + "-" + result.calendar["month"])
    console.log(calendar_num)
    const events = (result.events)?result.events:[]


    return {
        props: {
            calendar: calendar_num,
            events: events,
            calendar_id: roomId,
            user_id: ""

        } // will be passed to the page component as props
    }


}*/

export default EventViewPage