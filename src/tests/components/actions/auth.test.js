
import { logout,login } from "../../../components/actions/auth"
import { types } from "../../../components/types/types";





describe( '<auth /> actions test', () => {

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
    })







})