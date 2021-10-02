import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { login } from '../components/actions/auth';
import { startLoadingNotes } from '../components/actions/notes';
import { LoginScreen } from '../components/auth/LoginScreen';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    
    const dispatch = useDispatch(); // reference a la funcion dispatch de la tienda redux
    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setisLoggedIn ] = useState( false );
    
    useEffect( () => {    
        
        const auth = getAuth(); // puerta de entrada a la API de autenticación de Firebase 
        
        onAuthStateChanged( auth, async( user ) => {
            
            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setisLoggedIn( true );
                dispatch(startLoadingNotes(user.uid))
            } else {
                setisLoggedIn( false );
            }
            setChecking( false );
        });
    }, [ dispatch, setChecking, setisLoggedIn ]);

    
    
    
    
    
    
    
    
    
    if( checking ){
        return (
            <h1>Loading...</h1>
        )
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isLoggedIn={ isLoggedIn } 
                        path="/auth" // login
                        component={ LoginScreen }        
                        />
                    <PrivateRoute 
                        exact
                        path="/"
                        isLoggedIn={ isLoggedIn }
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
