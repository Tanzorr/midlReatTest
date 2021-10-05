import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {IEvent} from "../models/IEvent";


const Event:FC = ()=>{
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {events, guests} = useTypeSelector(state => state.event);
    const {user} = useTypeSelector(state=>state.auth);

    useEffect(()=>{
        fetchGuests();
        fetchEvents(user.username);
    },[]);

    const addNewEvent = (event: IEvent)=>{
        setModalVisible(false);
        createEvent(event)
    }

    return(
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={'center'}>
                <Button onClick={()=>setModalVisible(true)}>Add Event</Button>
            </Row>
            <Modal
                title='Add Event'
                visible={modalVisible}
                footer={null}
                onCancel={()=>setModalVisible(false)}
            >
            <EventForm
                submit={addNewEvent}
                guests={guests}/>
            </Modal>
        </Layout>
    )
}

export default Event;