import {ActionTypes} from "./header.type";

export interface HeaderActions {
    type: ActionTypes.COUNTER;
}

export function counter(): HeaderActions {
    return {
        type: ActionTypes.COUNTER
    };
}
