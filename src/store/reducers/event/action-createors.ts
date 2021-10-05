import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types"
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";



export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction=>({type:EventActionEnum.SET_GUESTS, payload}),
    setEvents:(payload:IEvent[]): SetEventsAction=>({type:EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: ()=> async (dispatch: AppDispatch)=>{
        try {
            const  response= await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data))
        }catch (e){
            console.log(e);
        }
    },

    createEvent: (event: IEvent)=>async (dispatch : AppDispatch)=>{
        try {
            const events = localStorage.getItem('events') || '[]'
            let json = JSON.parse(events) as IEvent[];
            console.log(json);
            console.log('event', event);
            json.push(event)
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json))
        }catch (e) {
            console.log(e)
        }
    },

    fetchEvents: (username: string)=>async (dispatch : AppDispatch)=>{
        try {
            const events = localStorage.getItem('events') || '[]'
            let json = JSON.parse(events) as IEvent[]

            const currentEvents = json.filter(ev=> ev.author === username || ev.quest === username);
            console.log('currentEvents', currentEvents);
            dispatch(EventActionCreators.setEvents(currentEvents));
        }catch (e) {
            console.log(e)
        }
    }

}