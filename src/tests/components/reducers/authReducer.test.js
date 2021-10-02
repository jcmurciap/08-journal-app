import { authReducer } from "../../../components/reducers/authReducer";
import { types } from "../../../components/types/types"

describe( '<authReducer /> tests', () => {

    test( 'Return status by default', () => {

        const action = {
            type: 'nothing',
            payload: {
                uid: 123,
                displayName: 'user'
            }
        };
        expect( authReducer({}, action) ).toEqual({});
    });

    test( 'Make logout session', () => {
        const action = {
            type: '[Auth] logout',
            payload: {
                uid: 123,
                displayName: 'user'
            }
        };
        expect( authReducer({}, action) ).toEqual({});    
    });

    test( 'Make login session', () => {
        const action = {
            type: '[Auth] Login',
            payload: {
                uid: 123,
                displayName: 'user'
            }
        };
        const { uid, name } = authReducer({}, action);
        expect( typeof name ).toBe('string');        
    });
});
