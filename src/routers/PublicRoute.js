// este componente busca solucionar: bloquea navegar por la pagina una vez que esta por fuera
// modules
import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';


export const PublicRoute = ({
    
    isLoggedIn, // bool
    component: Component,
    ...rest // exact, path
    
    }) => {
    
        return (

        <Route { ...rest }
            // props => history,location,match
            component={( props ) => (
                ( !isLoggedIn )
                    ?( < Component { ...props } /> ) // ... spread operator
                    : ( < Redirect to="/" /> )
            )}
        />
    )
}

PublicRoute.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

