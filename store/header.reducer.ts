import {ActionTypes, HeaderState} from "./header.type";
import {HeaderActions} from "./header.action";
import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import {createWrapper} from "next-redux-wrapper";


export const initialState: HeaderState = {
    count: 99
};
export function HeaderReducer(
    state: HeaderState = initialState,
    action: HeaderActions
) {
    switch (action.type) {
        case ActionTypes.COUNTER:
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
}

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const initStore = () => {
    return createStore(HeaderReducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
