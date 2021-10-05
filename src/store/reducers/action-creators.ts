import {AuthActionCreator} from "./auth/action-creators";
import {EventActionCreators} from "./event/action-createors";



export const  allActionCreators = {
    ...AuthActionCreator,
    ...EventActionCreators
}