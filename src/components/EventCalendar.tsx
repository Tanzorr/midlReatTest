import React, {FC} from "react";
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import { formDate } from "../utils/date";


interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    function dateCellRender(value: Moment){
        const formatDate = formDate(value.toDate());
        const currentDayEvents = props.events.filter(ev=>ev.date === formatDate);
        return(
            <div>
                {
                    currentDayEvents.map((ev, i)=>{
                        return <div key={i}>{ev.description}</div>
                    })
                }
            </div>
        )
    }

    return (<Calendar dateCellRender={dateCellRender}/>
    );
}

export default EventCalendar;