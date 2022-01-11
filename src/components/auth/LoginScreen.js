import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import { useForm } from '../hooks/useForms';
import { startGoogleLogin, startLoginEmailPassword } from '../actions/auth';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    
    const { loading } = useSelector( state => state.ui); // REVISE COMO FUNCIONA 
    
    const [ formValues, handleInputChange ] = useForm({}); 
    
    const { email, password } = formValues;
        
    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) ); // registrado en redux
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };
    
    return (
        <>
            <div className='auth__container'>
                <h3 className="auth__title">
                    Sign In
                </h3>
                <form 
                    onSubmit={ handleLogin }
                    className="animate__animated animate__fadeIn animate__faster"
                >
                    <input 
                        autoComplete="off"
                        className="auth__input"
                        name="email"
                        onChange={ handleInputChange }    
                        placeholder="Email"
                        type="text"
                        value={ email }
                    />
                    <input 
                        className="auth__input"
                        name="password" 
                        onChange={ handleInputChange }  
                        placeholder="Password"
                        type="password"
                        value={ password } 
                    />
                
                    <button 
                        className="btn btn-primary btn-block"
                        disabled={ loading }
                        type="submit"
                    >
                        Login
                    </button>
                    
                    <div className="auth__social-networks">
                        <p>Login with social networks</p>
                        <div 
                            className="google-btn"
                            onClick={ handleGoogleLogin }
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign In with google</b>
                            </p>
                        </div>
                    </div>
                    
                    <Link to="/auth/register" className="link">
                        Create new account
                    </Link>
                </form>
            </div>
        </>
    )
}
