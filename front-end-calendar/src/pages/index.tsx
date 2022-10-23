import React from 'react'
import { Event } from 'src/domain/entity'
import { getCalendar } from "src/pages/api/getCalendar"
import EventView from 'src/components/EventView';
import { getSystemErrorMap } from 'util';
import liff from '@line/liff/dist/lib';
interface Props {
    calendar_id: string
    user_id: string
    events: Event[]
    calendar: number[][]
}
const EventViewPage: React.FC<Props> = ({ calendar_id, user_id, events, calendar }) => {

    return (
        <>
            <EventView
                calendar={calendar}
                calendar_id={calendar_id}
                user_id={user_id}
                events={events}
            />            
        </>

    )


}
export async function getServerSideProps(context: any) {
    const roomId = liff.getContext()?.groupId
    const endpoint = "https://line-chat-bot-1114.herokuapp.com/webview/event_view"//'https://line-chat-bot-1114.herokuapp.com/webview/event_view'
    const keyword = {
        room_id: roomId,
    }
    const JSONdata = JSON.stringify(keyword)
    const options = {
        method:'POST',
        mode:"cors" as RequestMode,
        headers: {
            'Content-Type':'application/json',
        },
        body: JSONdata,
    }    
    const response = await fetch(endpoint, options)
    const result = await response.json()
    
    const calendar_num = getCalendar("2022"+"-"+result.calendar["month"])
    
    const events = result.events
    

    return {
        props: {
            calendar:calendar_num,
            events:events,
            calendar_id:roomId,
            
        } // will be passed to the page component as props
    }
}

export default EventViewPage