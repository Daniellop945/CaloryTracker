import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Estado inicial
const initialState = {
  caloriesConsumed: 0,
  caloriesBurned: 0,
};

// Reducer para manejar las acciones
const calorieReducer = (state : any, action : any) => {
  if(action.type === 'CONSUME_CALORIES'){
    return {...state, caloriesConsumed: state.caloriesConsumed + action.payload }
  }
  if(action.type === 'BURN_CALORIES'){
    return {...state, caloriesBurned: state.caloriesBurned + action.payload }
  }
  if(action.type === 'RESET_CALORIES'){
    return initialState
  }
  return state
};

const getInitialState = () => {
  try{
    const storedState = localStorage.getItem('calorieState')
    return storedState ? JSON.parse(storedState) : initialState
  } catch(e){
    return initialState
  }
}

// Crear el contexto
const CalorieContext = createContext();

// Proveedor del contexto
const CalorieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calorieReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('calorieState', JSON.stringify(state))
  }, [state])

  return (
    <CalorieContext.Provider value={{ state, dispatch }}>
      {children}
    </CalorieContext.Provider>
  );
};

export { CalorieContext, CalorieProvider};