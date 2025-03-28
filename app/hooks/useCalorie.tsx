import { useEffect } from 'react';
import type { caloriesState } from '~/interfaces/interfaces';

type Actions = 
    | { type : 'addCaloriesConsumed', payload: number }
    | { type : 'addCaloriesBurned', payload: number }
    | { type : 'editCaloriesConsumed', payload: number }
    | { type : 'editCaloriesBurned', payload: number }
    
const getInitialState = (): caloriesState => {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('caloriesState');
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (error) {
                console.error('Error parsing caloriesState from localStorage:', error);
                const initialState: caloriesState = { caloriesConsumed: 0, caloriesBurned: 0 };
                localStorage.setItem('caloriesState', JSON.stringify(initialState));
                return initialState;
            }
        } else {
            const initialState: caloriesState = { caloriesConsumed: 0, caloriesBurned: 0 };
            localStorage.setItem('caloriesState', JSON.stringify(initialState));
            return initialState;
        }
    }
    return { caloriesConsumed: 0, caloriesBurned: 0 };
};

const initialState: caloriesState = getInitialState()

export const reducerCalories = (state : caloriesState = initialState, action : Actions) => {
    
    let newState: caloriesState;

    switch (action.type){
        case 'addCaloriesConsumed': 
            newState = { ...state, caloriesConsumed: state.caloriesConsumed + action.payload };
            break;
        case 'addCaloriesBurned':
            newState = { ...state, caloriesBurned: state.caloriesBurned + action.payload };
            break;
        case 'editCaloriesConsumed':
            newState = { ...state, caloriesConsumed: action.payload };
            break;
        case 'editCaloriesBurned':
            newState = { ...state, caloriesBurned: action.payload };
            break;
        default:
            return state;
    }

    localStorage.setItem('caloriesState', JSON.stringify(newState));
    return newState;
    
}

