import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { login } from '../../components/actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import firebase from '../../firebase/firebase-config';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import Swal from 'sweetalert2';

// cuando se usa la importacion por defecto se usa el metodo directamente:
// Swal => fire; directly
jest.mock('sweetalert2', () => ({
    // simulate function
    fire: jest.fn(),
    login: jest.fn(),
}));

jest.mock('../../components/actions/auth', () => ({
    // simulate function (mock-engaño) 
    login: jest.fn(),
}));

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
    notes: {
        active: {
            id: 'ABC',
        },
        notes: [],
    }
};

let store = mockStore(initState);

// mock the store
store.dispatch = jest.fn(); 



describe( '<AppRouter /> tests', () => {
    test('Should to call login component if i\'m authenticated', async() => {
        
        let user;

        await act( async () => {
            
            const auth = getAuth();
            
            const userCred = await signInWithEmailAndPassword(auth, 'test@test.com', '123456');
            user = userCred.user;            
            
            // mount: simulate a component going through an unmount/mount lifecycle.
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });
    
        expect( login ).toHaveBeenCalled(); // 1
        // didn't allow to use 'toHaveBeenCalledWith()' get bug
        
    });




});
