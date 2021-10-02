import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: ''
};

export const uiReducer = ( state=initialState, action ) => {
    
    switch ( action.type ) {
        
        case types.uiSetError:    // [UI] set Error
            return {
                ...state,
                msgError: action.payload,
            }
        case types.uiRemoveError: // [UI] Remove Error
            return {
                ...state,
                msgError: null,
            }
        case types.uiStartLoading:
            return {
                ...state,
                loading: true, // maybe fixme!
            }
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false, // maybe fixme!
            }
        default:
            return state;
    }
}


