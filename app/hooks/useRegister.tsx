'use client'
import type { data } from '../interfaces/interfaces'

type Actions = 
    | { type: 'ADD_ACTIVITY', payload : {id: string, type: 'Comida' | 'Ejercicio', calories: number, description: string}}
    | { type: 'EDIT_ACTIVITY', payload: {id: string, type: 'Comida' | 'Ejercicio', calories: number, description: string}}
    | { type: 'DELETE_ACTIVITY', payload: {id: string, type: 'Comida' | 'Ejercicio', calories: number }}
    | { type: 'RESET_APP' }
    | { type: 'REPLACE_STATE', payload: data}

export const reducerActivities = (state: data, action: Actions): data => {
    
    let updateState

    switch (action.type) {
        case 'ADD_ACTIVITY':
            updateState = [...state, action.payload];
            return updateState;
        case 'DELETE_ACTIVITY':
            updateState = state.filter(activity => activity.id !== action.payload.id);
            return updateState;
        case 'EDIT_ACTIVITY':
            updateState = state.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, ...action.payload };
                }
                return todo;
            });
            return updateState;
        case 'REPLACE_STATE': 
            return action.payload
        case 'RESET_APP':
            return [];
        default:
            return state;
    }
}   
