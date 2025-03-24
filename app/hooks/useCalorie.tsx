import type { caloriesState } from '~/interfaces/interfaces';

type Actions = 
    | { type : 'addCaloriesConsumed', payload: number}
    | { type : 'addCaloriesBurned', payload: number}

export const reducerCalories = (state : caloriesState, action : Actions) => {
    
    switch (action.type){
        case 'addCaloriesConsumed': 
            return {...state, caloriesConsumed: state.caloriesConsumed + action.payload}
        case 'addCaloriesBurned' :
            return {...state, caloriesBurned: state.caloriesBurned + action.payload}
        default: 
            return state
    }
    
}

