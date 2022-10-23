import React, { useEffect, useState } from 'react'

import { Event, User } from 'src/domain/entity'
import { Container, Row, Col } from 'react-bootstrap'

import Button from 'react-bootstrap/Button';
interface Props {
    event: Event
    member: User
}

const VoteButton: React.FC<Props> = ({ event, member }) => {
    const [vote, setVote] = useState('up')
    const [vote_num, setVotenum] = useState(event.vote_num)
    const [coler,setC] = useState('blue')
    useEffect(()=>{
        const voted_people = event.voted_people.split(',')
        console.log(voted_people)
        voted_people.map((p:string)=> {
            if (p == member.id){setVote('down')}
        })
    },[])
    useEffect(()=>{
        if (vote=='up'){
            setC("outline-info")
            console.log(coler)
        }else if(vote=='down'){
            setC('outline-primary')
            console.log(coler)
        }
    },[vote])
    const updateEvent = async () => {
        const end_point = "http://127.0.0.1:5000/webview/event_vote"
        console.log(member.id)
        const data = { "event_id": event.id, "user_id": member.id, "vote": vote }
        if (vote == 'up') {
            setVotenum(vote_num + 1)
        } else if(vote == 'down') {
            setVotenum(vote_num - 1)
        }

        const JSONdata = JSON.stringify(data)
        const options = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        console.log(options)
        const response = await fetch(end_point, options)

        if (vote == 'up') {
            await setVote('down')
            console.log(vote)
        } else {
            await setVote('up')
            console.log(vote)
        }

    }

    return (
        <>
            <Button variant={coler}  onClick={() => updateEvent()}>
                投票数:{vote_num}
            </Button>

        </>

    )
}

export default VoteButton