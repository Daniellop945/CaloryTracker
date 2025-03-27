import { createContext, useReducer, type JSX } from "react";
import type { caloriesState } from "~/interfaces/interfaces";
import { reducerCalories } from '../hooks/useCalorie'

const initialState: caloriesState = {
    caloriesConsumed: 0,
    caloriesBurned: 0
}

interface props {
    children: JSX.Element | JSX.Element[]
}

export type calorieContextProps = {
    caloriesState : caloriesState,
    addCaloriesConsumed: (calories: number) => void,
    addCaloriesBurned: (calories: number) => void,
    editCaloriesConsumed: (calories: number) => void,
    editCaloriesBurned: (calories: number) => void
}

export const Context = createContext<calorieContextProps >({} as calorieContextProps)

export const ContextProvider = ({ children } : props) => {
    
    const [caloriesState, dispatch] = useReducer(reducerCalories, initialState)

    const addCaloriesConsumed = (calories : number) => {
        dispatch({ type: 'addCaloriesConsumed', payload: calories })
    }

    const addCaloriesBurned = (calories : number) => {
        dispatch({ type: 'addCaloriesBurned', payload: calories })
    }

    const editCaloriesConsumed = (calories : number) => {
        dispatch({ type: 'editCaloriesConsumed', payload: calories })
    }
    
    const editCaloriesBurned = (calories : number) => {
        dispatch({ type: 'editCaloriesBurned', payload: calories })
    }

    return (
        <Context.Provider value={{
            caloriesState, 
            addCaloriesConsumed,
            addCaloriesBurned,
            editCaloriesConsumed,
            editCaloriesBurned
        }}>
            {children}
        </Context.Provider>
    )
}


