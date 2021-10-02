import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
// import thunk from 'redux-thunk';
import { uiReducer } from "../reducers/uiReducer";
import { noteReducer } from "../reducers/notesReducer";

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
  
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: noteReducer,
})

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    ) 
);
