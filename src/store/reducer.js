import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import chatReducer from './chatReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    chat: chatReducer
});

export default reducer;