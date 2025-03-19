'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useReducer, useState } from 'react';
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";
import imgComida  from '../../images/comida.svg'
import imgEjercicio  from '../../images/ejercicio.svg'

function DynamicTable() {
    const x = localStorage.getItem('datosActividad');

    if (x === '{}' || x === undefined || x === null || x === '[]') return <h1 className="text-white">No hay datos para mostrar</h1>;

    let arr = JSON.parse(x);
    const a = [];

    for (let i in arr) {
        const b = { id: i, type: arr[i].type, calories: arr[i].calories, description: arr[i].description };
        a.push(b);
    }

    const reducer = (state : any, action : any) => {
        if (action.type === "delete") {
            const newArr = state.filter((todo : any) => todo.id !== action.payload.id);
            localStorage.setItem('datosActividad', JSON.stringify(newArr));
            return newArr;
        }

        if (action.type === "edit") {
            const updatedState = state.map((todo : any) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, type: action.payload.type, calories: action.payload.calories, description: action.payload.description };
                }
                return todo;
            });
            localStorage.setItem('datosActividad', JSON.stringify(updatedState));
            return updatedState;
        }

        return state;
    };

    const initialState = a;
    let [todos, dispatch] = useReducer(reducer, initialState);

    return (
        <Table className="text-center">
            <TableHeader>
                <TableRow className="bg-violet-400">
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-center">Actividades</TableHead>
                    <TableHead className="text-center">Calorias</TableHead>
                    <TableHead className="text-center">Operaciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                {todos.map((todo : any) => (
                    <TableRow key={todo.id}>
                        {todo.type === 'Comida' ? (
                            <TableCell>
                                <img src = {imgComida} alt = "Comida" /> Comida
                            </TableCell>
                            ) :
                            <TableCell>
                                <img src = {imgEjercicio} alt = "Ejercicio" /> Ejercicio
                            </TableCell>
                        }
                        <TableCell>{todo.description}</TableCell>
                        <TableCell>{todo.calories}</TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-500 text-white mr-4">
                                        Editar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[400px] bg-black">
                                    <DialogHeader>
                                        <DialogTitle className="text-white"> Editar registro </DialogTitle>
                                        <DialogDescription className="text-white">
                                            Aqui puedes modificar tus registros
                                        </DialogDescription>
                                    </DialogHeader>
                                    <EditDialogContent todo={todo} dispatch={dispatch}/>
                                </DialogContent>
                            </Dialog>
                            <Button className="bg-red-500 text-white" onClick={() => dispatch({ type: 'delete', payload: { id: todo.id } })}>
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function EditDialogContent({todo, dispatch }) {
    const [editedType, setEditedType] = useState(todo.type);
    const [editedCalories, setEditedCalories] = useState(todo.calories);
    const [editedDescription, setEditedDescription] = useState(todo.description);

    return (
        <div className="text-white p-4">
            <div>
                <Label>Tipo de registro</Label>
                <Select value={editedType} onValueChange={setEditedType}>
                    <SelectTrigger className="border-0 w-[250px]">
                        <SelectValue placeholder='Selecciona un tipo de registro' />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="Comida">Comidad (Calorías consumidas)</SelectItem>
                        <SelectItem value="Ejercicio">Ejercicio (Calorías quemadas)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 mt-4">
                <Label className="mb-4">Calorías</Label>
                <Input value={editedCalories} onChange={(e) => setEditedCalories(Number(e.target.value))} />
            </div>
            <div>
                <Label className="mb-4">Descripción</Label>
                <Textarea className="mb-4" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
            </div>
            <div className="flex flex-col justify-center">
                <DialogClose asChild>
                    <Button className="bg-blue-500 text-amber-50" onClick={() =>
                        dispatch({
                            type: 'edit', payload: { id: todo.id, type: editedType, calories: editedCalories, description: editedDescription }
                        })}
                    >Guardar Cambios</Button>
                </DialogClose>
            </div>
        </div>
    );
}

export { DynamicTable };