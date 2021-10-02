// modules
import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';


export const PrivateRoute = ({
    isLoggedIn, // bool
    component: Component, // function
    ...rest // { computedMatch,location } 
}) => {
    
    
    return (
        <Route { ...rest }
            // props => history,location,match
            component={( props ) => (
                ( isLoggedIn )
                    ?( <Component { ...props }/> ) // ... spread operator
                    : ( <Redirect to="/auth/login" /> )
            )}
        />
    )
}

PrivateRoute.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
