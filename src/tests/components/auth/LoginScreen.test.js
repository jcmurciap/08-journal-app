// libraries
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

// fingir rutas
import {MemoryRouter} from 'react-router-dom';

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {LoginScreen} from "../../../components/auth/LoginScreen"
import { startGoogleLogin, startLoginEmailPassword } from '../../../components/actions/auth';

jest.mock('../../../components/actions/auth', () => ({
    // simulate function
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),    
}))



const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

// store current status
const initState = {
    auth: {},
    ui: {
        loading: true,
        msgError: null,
    },
};

let store = mockStore(initState);

// mock the store
store.dispatch = jest.fn(); 


// mount: simulate a component going through an unmount/mount lifecycle.
const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe( '<LoginScreen /> tests', () => {

    // reinicializacion del store para cada ejecución de una prueba
    beforeEach( () => {
        store = mockStore( initState );

        // good practice => restablish default values
        jest.clearAllMocks()
    });

    test('Return skeleton', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('should dispatch startGoogleLogin action effectively', () => {

        // simulate click on 'div' => 'google-btn'
        // call function
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    })

    test( 'startLoginEmailPassword should be execute with parameters correctly', () => {

        const user = {
            email: 'camilo@gmail.com',
            password: '123',
        }

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){} // why?
        });
        expect(startLoginEmailPassword).toHaveBeenCalledWith(user.email, user.password);
    });


})



