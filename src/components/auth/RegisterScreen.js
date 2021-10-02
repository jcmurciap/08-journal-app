import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForms';
import validator from 'validator';
import { removeError, setError } from '../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../actions/auth';

export const RegisterScreen = () => {
   
    const dispatch = useDispatch(); 
    const {  msgError } = useSelector( state => state.ui );
    
    const [ formValues, handleInputChange ] = useForm({
        fname: 'jose',
        email: 'jose@gmail.com',
        password: 'camilo',
        password2: 'camilo',
    });
    const { fname, email, password, password2 } = formValues;
    
    

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ){

            dispatch( startRegisterWithEmailPasswordName( fname, email, password ) )
        }
    }

    const isFormValid = () => {
        if( fname.trim().length === 0 ){
            dispatch(setError('Name is requerided.\n\tTry again'));
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch(setError('Email is requerided.\n\tTry again'));
            return false;
        }else if( password !== password2 || password.length < 5 ) {
            dispatch(setError('Passwords needs to be equal and has at least 6 characters.\n\tTry again'));
            return false;
        }
        dispatch( removeError() );
        return true;
    }; 

    return (
        <>
            <h3 className="auth__title">
                Create New Account
            </h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError && (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="fname"
                    className="auth__input"
                    autoComplete="off"
                    value={ fname }    
                    onChange={ handleInputChange }
                />
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }    
                    onChange={ handleInputChange }
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password" 
                    className="auth__input"
                    value={ password }   
                    onChange={ handleInputChange }
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2" 
                    className="auth__input"
                    value={ password2 }   
                    onChange={ handleInputChange }
                />
            
                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
