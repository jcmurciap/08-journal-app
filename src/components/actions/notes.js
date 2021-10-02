// libraries
import Swal from 'sweetalert2';
import { collection, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';

// components
import { types } from '../types/types';
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from '../../helpers/fileUpload';
import { db } from "../../firebase/firebase-config";

export const startNewNote = () => {

    return async (dispatch , getState) => {
        
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc( collection( db, `${ uid }/journal/notes` ), newNote );
        
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note,
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startSaveNote = ( note ) => {
    
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url
        };

        const noteToFirestore = {...note}; // id,body,date,title,url
        delete noteToFirestore.id; // body,date,title,url

        // guarda en la base de datos
        await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
    
        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success');
    }; 
};


// actualiza del store el titulo y el body de la tarjeta que cambia
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note,
        }
    }
});  

export const startUploading = ( file ) => {
    
    return async( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        const fileUrl = await fileUpload( file );
        
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) );
        
        Swal.close();
    };
};

export const startDeleting = ( id ) => {
    
    return async( dispatch, getState ) => {
        
        const uid = getState().auth.uid;
        await deleteDoc( doc(db, `${ uid }/journal/notes/${ id }`));
        dispatch( deleteNote( id ) );
    };
};

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id,
});

export const noteLogout = ( notes ) => ({
    
    type: types.notesLogoutCleaning,
})
