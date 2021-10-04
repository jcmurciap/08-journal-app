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
    });

    test('Return skeleton', () => {

        expect(wrapper).toMatchSnapshot();

    });
})
