/**
 * @jest-environment node
*/
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'; 
import { deleteNote, startLoadingNotes, startNewNote, startSaveNote } from '../../../components/actions/notes';
import { types } from '../../../components/types/types';
import {doc, deleteDoc} from 'firebase/firestore'
import { db } from '../../../firebase/firebase-config';

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

// store current status
const initState = {
    auth: {
        uid: 'randomUserTest'
    }
};

let store = mockStore({initState});

describe( '<notes /> tests', () => {

    // reinicializacion del store
    beforeEach( () => {
        store = mockStore( initState )
    });
    
    // install redux-mock-store
    test( 'Create a new note startNewNote', async() => {
        // 'mockStore' me brinda 'dispatch'
        await store.dispatch( startNewNote() );
        // Hasta aca hay un error y es que no se puede hacer pruebas
        // para acceder a la base de datos de producción.
        // Tenemos que crear una BBDD de pruebas.
        // la solucion fue configurar en firebase-config.js

        // return 2 dispatches(activeNote,addNewNote)
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id; 
        await deleteDoc( doc(db, `randomUserTest/journal/notes/${docId}`) );  
    });

    
    test( 'startLoadingNotes loading notes', async() => {   
        
        await store.dispatch( startLoadingNotes('randomUserTest') ); 
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        // el objeto tiene lo que esperamos?
        const expected = {
            id: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
            title: expect.any(String),
        } 
        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test( 'startSaveNote update the note', async() => {

        const note = {
            id: 'aRUx2fWsAQS6FEkMQxbF',
            title: 'title',
            body: 'body'
        };        
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions()
        expect(actions[0].type).toBe(types.notesUpdated);
    })
});
