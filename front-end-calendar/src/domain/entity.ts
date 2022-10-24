export type Calendar = {
    id: string,
    event_name: string,
            deadline: string,
            month: string,
            created_date: string,
            updated_date: string,

}
export type User = {
    id : string,
    name : string,
    event_calendar_id:string,
    voted_event : string,
    voted_number :number,
    created_date : string,
}

export type Event = {
    id: string,
    date: string,
    calendar_id: string,
    name: string,
    vote_num:number,
    voted_people:string,
    start_time: string,
    end_time: string,
    created: string,
}
export type Group = {
    id: string,
    calendar_id: string,
    member_id: string,
    created: string,
    updated: string,

}
export type PageProps = {
    liff: any,
    liffError: any,
    user_name: string,

}