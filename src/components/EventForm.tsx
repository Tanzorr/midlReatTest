import React, {FC, useState} from "react";
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formDate} from "../utils/date";
import {useTypeSelector} from "../hooks/useTypeSelector";

interface EventFormProps {
    guests: IUser[],
    submit:(event: IEvent)=>void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author:'',
        quest:'',
        date:'',
        description:''
    }as IEvent )

    const {user}=useTypeSelector(state=> state.auth)

    const selectDate = (date: Moment | null) => {
        if(date){
            setEvent({...event, date: formDate(date.toDate())})
        }

    }

    const submitForm = ()=>{
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e=>setEvent({...event, description:e.target.value })}
                    value={event.description}/>
            </Form.Item>
            <Form.Item
                label="Event data"
                name="date"
                rules={[rules.required(), rules.isDateAfter('You cant add Event in past')]}
            >
                <DatePicker
                    onChange={(date)=>selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="chose guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(e:string)=>{
                    setEvent({...event,quest:e})
                }}>
                    {props.guests.map(guest=>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify={"end"}>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm;