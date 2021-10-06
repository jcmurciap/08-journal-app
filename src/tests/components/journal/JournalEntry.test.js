// libraries
import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../components/actions/notes';

const middlewares = [thunk];

// create a store
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

/**
 * Is used for actions that must be plain objects.
 * Use custom middleware for async actions.
 */
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'hello',
    body: 'world',
};

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note}/>
    </Provider>
);

describe('<JournalEntry /> tests', () => {

    test('Should to show skeleton correctly', () => {
        
        expect(wrapper).toMatchSnapshot();
    });

    test('Should to activate the note',() => {

        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, { ...note })
        );
    });



});
