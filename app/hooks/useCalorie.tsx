import { useContext } from 'react';
import { CalorieContext } from './calorieContext'; // Ajusta la ruta si es necesario

const useCalorie = () => {
    const context = useContext(CalorieContext);

    if (!context) {
        throw new Error('useCalorie debe ser usado dentro de un CalorieProvider');
    }

    const { state , dispatch } = context;

    const consumeCalories = (calories : any) => {
        dispatch({ type: 'CONSUME_CALORIES', payload: calories });
    };

    const burnCalories = (calories : any) => {
        dispatch({ type: 'BURN_CALORIES', payload: calories });
    };

    const resetCalories = () => {
        dispatch({ type: 'RESET_CALORIES'})
    }

    return {
        caloriesConsumed: state.caloriesConsumed,
        caloriesBurned: state.caloriesBurned,
        consumeCalories,
        burnCalories,
        resetCalories,
    };
};

export default useCalorie;