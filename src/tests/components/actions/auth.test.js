// libraries
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { logout,login, startLogout, startLoginEmailPassword } from "../../../components/actions/auth"
import { types } from "../../../components/types/types";

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

// store current status
const initState = {};

let store = mockStore({initState});



describe( '<auth /> actions test', () => {

    // reinicializacion del store para cada ejecución de una prueba
    beforeEach( () => {
        store = mockStore( initState );
    });
    
    test( 'login and logout creates actions respectively', () => {

        const args = {
            type: types.login,
            payload: {
                uid: 'randomUserTest',
                displayName: 'Camilo',
            }
        };
        const expected = logout();
    
        expect(expected).toEqual({type: types.logout});
        expect(login('randomUserTest', 'Camilo')).toEqual({
            type: types.login,
            payload: {
                uid:'randomUserTest',
                displayName:'Camilo',
            }
        })
    });

    test('startLogout succesfully', async() => {

        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions[0]).toEqual({type: types.logout});
        expect(actions[1]).toEqual({type: types.notesLogoutCleaning});

    });

    test( 'should login effectivelly in startLoginEmailPassword method', async() => {

        await store.dispatch(startLoginEmailPassword('test@test.com', '123456'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });
        
        expect(actions[1]).toEqual({
            type: types.uiFinishLoading
        });
        
        expect(actions[2]).toEqual({
            type: types.login,
            payload: {
                uid: 123,
                displayName: 'user123'
            }
        });
    });




})