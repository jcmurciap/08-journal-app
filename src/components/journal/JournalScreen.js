import React from 'react';
import { useSelector } from 'react-redux';
import { NotesScreen } from '../../styles/components/notes/NotesScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';



export const JournalScreen = () => {
    
    // extraer algo del store o el state
    const { active } = useSelector( state => state.notes );
    
    
    return (

        <div 
            className="journal__main-content animate__animated animate__fadeIn animate__faster"
        >

            <Sidebar />
        
            <main>
                {
                    (active)
                        ? ( <NotesScreen /> )
                        // pantalla morada
                        : ( <NothingSelected  /> )
                }                
            </main>
        </div>
    )
}



