/*
como quiero que esté mi state

    {
        // cada una de las tarjetas
        notes: [],
        // nota activa
        active: null,
        active: {
            id: 'HJFBBVVJH',
            title: '',
            body: '',
            imageURL: '',
            date: 13456
        }
    }
*/

import { types } from "../types/types";

const initialstate = {
    notes: [],
    active: null,
}

export const noteReducer = ( state=initialstate, action ) => {

    switch( action.type ){

        case types.notesActive:
            return {
                // clona el estado anterior
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.notesAddNew:
            return {
                ...state, 
                notes: [action.payload, ...state.notes],// ...state.notes => crea copia de las notas
            }    
        
        
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                // purga 'active' de la nota en redux
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload ),
            }        
        
        case types.notesLogoutCleaning:
            return {
                ...state,// cosas que no quiera perder - me falto incluir
                active: null, // nota activa-me falto incluir
                notes: [], // fue mi respuesta
            }
        
        
            default:
            return state;
    }
}


