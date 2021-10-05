import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { NotesScreen } from "../../../styles/components/notes/NotesScreen";
import configureStore from 'redux-mock-store';
import { activeNote } from '../../../components/actions/notes';
import { Provider } from 'react-redux';

jest.mock('../../../components/actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

// store current status
const initState = {
    auth: {
        uid: '1',
        name: 'camilo'
    },
    ui: {
        loading: true,
        msgError: null,
    },
    notes: {
        active: {
            id: 1234,
            title: 'hello',
            body: 'world',
            date: 0,
        },
        notes: [],
    }
};

let store = mockStore(initState);

// mock the store
store.dispatch = jest.fn(); 



describe( '<NotesScreen /> tests', () => {

    
    const wrapper = mount(
        <Provider store={store}>
            <NotesScreen/>
        </Provider>
    )
    
    test('show skeleton correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Should to dispatch activeNote action component', () => {

        // modifica la caja de texto
        wrapper.find('input[name="title"]').simulate('change', {
            // evento
            target: {
                name: 'title',
                value: 'hello again',
            } 
        });
        
        // activeNote fue llamado 2 veces,por el useEffect(al inicio y al actualizar)
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'world',
                title: 'hello again',
                id:1234,
                date: 0
            }
        )
    });
});