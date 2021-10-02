import { finishLoading, removeError, setError, startLoading } from "../../../components/actions/ui";
import { types } from "../../../components/types/types";

describe( '<ui /> tests', () => {
    
    test( 'all actions should work effectivelly', () => {
        
        // setError
        const action = setError('help!');
        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'help!' 
        })

        //removeError
        const actionRemoveError = removeError();
        expect( actionRemoveError ).toEqual({
            type: types.uiRemoveError
        }); 

        //startLoading
        const actionStartLoading = startLoading();
        expect( actionStartLoading ).toEqual({
            type: types.uiStartLoading
        })

        //finishLoading
        const actionFinishLoading = finishLoading();
        expect( actionFinishLoading ).toEqual({
            type: types.uiFinishLoading
        });
    });
})

