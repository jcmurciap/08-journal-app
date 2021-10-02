import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../../components/actions/notes';
import { useForm } from '../../../components/hooks/useForms';
import { NotesAppBar } from './NotesAppBar'


export const NotesScreen = () => {
    
    const dispatch = useDispatch();
    
    // referencia a la nota activa
    const { active: note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body } = formValues;
    
    const activeId = useRef( note.id );
    
    // el efecto se dispara si y solo si el 'id' cambia
    useEffect( () => {
        // evita loop infinito entre useSelector y useForm
        if ( note.id  !== activeId.current ){
            reset( note );
            // nuevo valor de 'activeId'
            activeId.current = note.id
        }
    }, [ note, reset ] );

    
    useEffect(() => {
        
        dispatch(activeNote(formValues.id, { ...formValues })); // ...formValues se desestructura en 'notes'       
    }, [ formValues, dispatch ])


    const handleDelete = () => {
        dispatch(startDeleting( note.id ));    
    }
    
    
    
    return (
        
        <div className="notes__main-content">
            <NotesAppBar />
            
            {/* Agrupador del formularo */}
            <div className="notes__content">
                <input 
                    className="notes__title-input"
                    placeholder="Some awesome title"
                    type="text"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />
                
                <textarea
                    className="notes__textarea"
                    placeholder="What hapenned today"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                >
                </textarea>

                {
                    ( note.url ) &&
                    (
                        <div className="notes__image">
                            <img
                                src={note.url}
                                alt="code"
                            />
                        </div>
                    )
                }

            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>    
        
        
        </div>
    )
}

