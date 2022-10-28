import React, { useEffect, useState } from 'react'
import { Calendar, Event } from 'src/domain/entity'
import { getCalendar } from "src/pages/api/getCalendar"
import EventView from 'src/components/EventView';
import { LineContext } from 'src/domain/context';
import { useContext } from 'react';

const EventViewPage: React.FC = () => {
    const { groupId } = useContext(LineContext)
    const [calendarNum, setCalendarNum] = useState<number[][]>([])
    const [es, setEvents] = useState<Event[]>([])
    const [s, setS] = useState([])

    useEffect(() => {
        const get_calendar = async () => {
            const data = {
                room_id: 'Cdf358fb1484640975bef1fee49ad3920'//""
            }
            const jdata = JSON.stringify(data)
            console.log(groupId)
            const option = await fetch("https://line-chat-bot-1114.herokuapp.com/webview/event_view", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
            })
            /*
          const options = {
              method: 'POST',
              mode: "no-cors",
              headers: {
                  //'Access-Control-Allow-Origin':"http://localhost:3000/",
                  'content-type': 'application/json',
                  //"Access-Control-Allow-Origin": "https://line-chat-bot-1114.herokuapp.com/webview/event_view",
              },

              body:jdata //Cdf358fb1484640975bef1fee49ad3920
          }
          const response = await fetch("https://line-chat-bot-1114.herokuapp.com/webview/event_view", options)//http://127.0.0.1:5000
          console.log(response)
          
          if (response.ok){
              
          }
          else {
              return response.text()
          }*/


            const result = await option.json()

            const cal = getCalendar("2022" + "-" + result.calendar["month"])
            setCalendarNum(cal)
            setEvents(result.events)
            return
        }

        get_calendar()

        
        


    }, [groupId])

    /*
     async function fetcher(url: string): Promise<boolean | null> {
         //const body = groupId
         const data = {
             "room_id": "Cdf358fb1484640975bef1fee49ad3920"//""
         }
         const options = {
             method: 'POST',
             mode: "no-cors",
             headers: {
                 //'Access-Control-Allow-Origin':"http://localhost:3000/",
                 'Content-Type': 'application/json',
                 //"Access-Control-Allow-Origin": "*",
             },
 
             body: JSON.stringify(data)
         }
         const response = await fetch(url,options);
         return response.json();
     }
     const data = useSWR("https://line-chat-bot-1114.herokuapp.com/webview/event_view",fetcher)
     console.log(data)
     */
    return (
        <>
            <>{s}</>
            <EventView
                calendar={calendarNum}
                calendar_id={groupId}
                events={es}
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