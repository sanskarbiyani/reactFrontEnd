// project imports
import config from '../config.js';

// action - state management
import * as actionTypes from './actions';


const user = JSON.parse(localStorage.getItem("user"));

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    isUser:user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null },
    group_list : {group:null,list:null},
    listname : {modelname:null,color:null,icon:null,description:null},
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.LISTNAME:
            return {
                ...state,
                listname: action.listname
            };
        case actionTypes.GROUP_LIST:
            return {
                ...state,
                group_list: action.group_list
            };
        case actionTypes.IS_USER:
            return {
                ...state,
                isUser: action.isUser
            };
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;