import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Calendar, Event, User } from 'src/domain/entity'
import { Container, Row, Col, } from 'react-bootstrap'
import { useRouter } from 'next/router'
interface Props {
    date: number
    calendar_id:string
}

const EventEdit: React.FC<Props> = ({ date,calendar_id }) => {
    const router = useRouter()
    
    const buttonClick = async (context: any) => {
        context.preventDefault()
        
        const endpoint = 'https://line-chat-bot-1114.herokuapp.com/webview/event_edit'
        const body = context.target
        const data = {
            name: body.formBasicName.value,
            start_time: body.formBasicStartTime.value,
            end_time: body.formBasicEndTime.value,
            calendar_id: calendar_id,
            date: date,
        }
        const JSONdata = JSON.stringify(data)
        const options = {
            method:'POST',
            mode:"cors"
            headers: {
                'Content-Type':'application/json',
            },
            mode:"cors" as RequestMode, 
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()

        if (result.status == 'succes') {
            const keyword = {"calendar_id":calendar_id,"date":date}
            router.push({ pathname: 'event-edit', query: keyword }  )
        }else{
            router.push('/')
        }

    }
    return (
        <>
            <Form onSubmit={buttonClick}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>イベントの名前</Form.Label>
                    <Form.Control type="text" placeholder="Normal text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicStartTime">
                    <Form.Label>時間</Form.Label>
                    <Form.Control type="time" placeholder="Normal text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEndTime">
                    <Form.Label>時間</Form.Label>
                    <Form.Control type="time" placeholder="Normal text" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default EventEdit