import { types } from "../types/types"
/*
    no autenticado => state={}
    autenticado => state={
        uid: 'any id'
        name: 'user name'
    }
*/

export const authReducer = ( state = {}, action ) => {
    
    switch ( action.type ) {
        
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            }
        
        case types.logout:
            return {}
        
        default:
            return state;
    }
}
