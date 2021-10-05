// libraries
import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../components/actions/auth';
import { startNewNote } from '../../../components/actions/notes';

jest.mock('../../../components/actions/auth', () => ({
    // function simulated
    startLogout: jest.fn()
    })
); 

jest.mock('../../../components/actions/notes', () => ({
    startNewNote: jest.fn()    
})
);

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'camilo'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    },
};

let store = mockStore(initState);

/**
 * Is used for actions that must be plain objects.
 *  Use custom middleware for async actions.
 */
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
);

describe('<Sidebar /> component tests', () => {
    
    test('Show skeleton correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('Should to call startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('Should to call startNewNote', () => {

        wrapper.find('.journal__new-entry').at(0).simulate('click');
        expect(startNewNote).toHaveBeenCalled();

    })



})