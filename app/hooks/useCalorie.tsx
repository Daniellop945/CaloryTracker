import type { caloriesState } from '~/interfaces/interfaces';

type Actions = 
    | { type : 'addCaloriesConsumed', payload: number }
    | { type : 'addCaloriesBurned', payload: number }
    | { type : 'editCaloriesConsumed', payload: number }
    | { type : 'editCaloriesBurned', payload: number }

const initialState: caloriesState = {
    caloriesConsumed: 0,
    caloriesBurned: 0
}

export const reducerCalories = (state : caloriesState = initialState, action : Actions) => {
    
    switch (action.type){
        case 'addCaloriesConsumed': 
            return {...state, caloriesConsumed: state.caloriesConsumed + action.payload}
        case 'addCaloriesBurned' :
            return {...state, caloriesBurned: state.caloriesBurned + action.payload}
        case 'editCaloriesConsumed':
            return {...state, caloriesConsumed: action.payload}
        case 'editCaloriesBurned':
            return {...state, caloriesBurned: action.payload}
        default: 
            return state
    }
    
}

