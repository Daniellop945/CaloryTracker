export interface caloriesState {
    caloriesConsumed: number
    caloriesBurned: number
}

export interface Activity {
    id: string,
    type: 'Comida' | 'Ejercicio',
    calories: number,
    description: string
}

export type data = Activity[];