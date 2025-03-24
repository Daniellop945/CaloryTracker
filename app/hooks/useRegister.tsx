'use client'
import type { data } from '../interfaces/interfaces'

type Actions = 
    | { type: 'ADD_ACTIVITY', payload : {id: string, type: 'Comida' | 'Ejercicio', calories: number, description: string}}
    | { type: 'EDIT_ACTIVITY', payload: {id: string, type: 'Comida' | 'Ejercicio', calories: number, description: string}}
    | { type: 'DELETE_ACTIVITY', payload: {id: string }}
    | { type: 'RESET_APP' }

export const reducerActivities = (state: data, action: Actions): data => {
    
    let updateState

    switch (action.type){
        case 'ADD_ACTIVITY':
            updateState = [...state, action.payload]
            localStorage.setItem('datosActividad', JSON.stringify(updateState))
            return updateState
        case 'DELETE_ACTIVITY':
            updateState = state.filter(activity => activity.id !== action.payload.id)
            localStorage.setItem('datosActividad', JSON.stringify(updateState))
            return updateState
        case 'EDIT_ACTIVITY':
            updateState = state.map( todo => {
                if(todo.id === action.payload.id){
                    return { ...todo, id: todo.id, type: todo.type, calories: todo.calories, description: todo.description}
                }
                return todo
            })
            localStorage.setItem('datosActividad', JSON.stringify(updateState))
            return updateState
        case 'RESET_APP':
            return [] 
        default:
            return state
    }
}   
