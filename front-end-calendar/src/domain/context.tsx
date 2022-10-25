import { create } from 'domain'
import React, {createContext, ReactNode, useState} from 'react'

import { Event,Calendar } from './entity'

class LineContextProps {
    month = ""
    userName:string = ""
    groupId:string = ""
    setUserName: (name:string) => void = ()=>{}
    setMonth: (month:string) => void = ()=>{}
    setGroupId: (id:string) => void = ()=>{}
    
}
export const LineContext = createContext<LineContextProps>(new LineContextProps())
type Props = {
    children: ReactNode
}
export const LineProvider = ({children}:Props)=>{
    const [userName,setUserName] = useState("")
    const [groupId,setGroupId] = useState("")
    const [month,setMonth] = useState("")
    return <LineContext.Provider value={{userName,setUserName,groupId,setGroupId,month,setMonth}}>{children}</LineContext.Provider>
}