// libraries
import Swal from 'sweetalert2';
import 'firebase/firestore';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebase-config';

// components
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';
import { types } from '../types/types';

export const startLoginEmailPassword = ( email, password ) => {

    
    return ( dispatch ) => {
        // gateway to the Firebase authentication API
        const auth = getAuth();
        
        dispatch( startLoading() );
        
        return signInWithEmailAndPassword( auth, email, password )
            .then(({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })   
            .catch( e => {
                dispatch( finishLoading() );
                Swal.fire( 'Error', e.message, 'error' );
            });
    }; 
}

// save data in firebase
export const startRegisterWithEmailPasswordName = ( name, email, password ) => {
    
    return ( dispatch ) => {
        const auth = getAuth();

        // autenticacion
        createUserWithEmailAndPassword( auth, email, password )
            .then( async({ user }) => {
                await updateProfile( user, { displayName: name } );
                dispatch( 
                    login( user.uid, user.displayName ) 
                );
            })
            .catch( e  => {
                Swal.fire( 'Error', e.message, 'error' );
            })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
            });
    };
}

export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName 
        }
    };
}

export const startLogout = () => {    
    
    return async( dispatch ) => {
        
        const auth = getAuth();
        await signOut( auth );
        dispatch( logout() );
        dispatch( noteLogout() );  
    };
}

export const logout = () => ({
    type: types.logout
})
