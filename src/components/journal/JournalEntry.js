import React from 'react';
import moment from 'moment';
import { activeNote } from '../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const noteDate = moment( date );
    const dispatch = useDispatch();

    const handleEntryClick = () => {        
        dispatch( 
            activeNote( 
                id, { date, title, body } 
            )
        );
    }

    return (
        <div 
            onClick={ handleEntryClick }
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster">
            
            {
                url && 
                <div 
                    className="journal__entry-picture"
                    // todos lo style en react deben ser objetos
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }   
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title} 
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>    
        </div>
    )
}
