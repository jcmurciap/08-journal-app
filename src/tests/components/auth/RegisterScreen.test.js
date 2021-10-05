import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import {MemoryRouter} from 'react-router-dom';
import { types } from '../../../components/types/types';

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        magError: null,
    },
    notes: {
        notes: [],
        active: null 
    },
};

let store = mockStore(initialState);

// mock the store
// store.dispatch = jest.fn(); 

describe('<RegisterScreen /> tests', () => {

    // reinicializacion del store para cada ejecución de una prueba
    // beforeEach( () => {
    //     store = mockStore( initialState );

    //     // good practice => restablish default values
    //     jest.clearAllMocks()
    // });
    
    const wrapper = mount(
        
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen /> 
            </MemoryRouter>
        </Provider>
    );

    
    test( 'Should to return a skeleton', () => {

        expect(wrapper).toMatchSnapshot();

    });

    // vamos a cambiar el email para dejarlo vacio y evaluamos.
    test('make dispatch to respectively action', () => {

        // referencia al email (input)
        const emailField = wrapper.find('input[name="email"]');

        // simulate the change === onChange
        emailField.simulate('change', {
            // recuerde que estamos trabajando con el customHook 'useForm'
            target: {
                value: '',
                name: 'email',
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is requerided.\n\tTry again'
        });
    });

    test( 'Show error box with alert message', () => {

        const initialState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'email has failed',
            },
        };

        const store = mockStore(initialState);

        const wrapper = mount(
        
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );
        
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);



    })








})











