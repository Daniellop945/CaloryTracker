'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from './button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Select } from './select'
import { Textarea } from './textarea'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Graphs } from './graphs'
import { useEffect, useState, useContext, useReducer } from 'react'
import { DynamicTable } from './dynamicTable'
import { Context } from '~/contexts/calorieContext'
import { reducerActivities } from '~/hooks/useRegister'

const options = z.enum(["Comida", "Ejercicio"]);

const formSchema = z.object({
    id: z.string(), 
    type: options,
    calories: z.string()
        .refine(
            (val) => /^\d+$/.test(val),
            "Debe ingresar solo números enteros"
        )
        .transform(Number),
    description: z.string().min(3, {
        message : "Debes agregar al menos una actividad o alguna comida"
    })
})

export function Formulario () {

    const getData = () => {
        if(typeof window !== 'undefined'){
            let data = localStorage.getItem('datosActividad')
            if(data) {
                return JSON.parse(data)
            }
            else {
                return []
            }
        }
    }

    //Usar el context
    const {caloriesState} = useContext(Context)
    const {addCaloriesConsumed, addCaloriesBurned} = useContext(Context)

    const [state, dispatch] = useReducer(reducerActivities, getData())

    useEffect(() => {
        localStorage.setItem('datosActividad', JSON.stringify(state))
    }, [state])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: crypto.randomUUID(),
            type: "Comida",
            calories: 0,
            description: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>){        
        
        //Reiniciar el formulario una vez que almaceno los datos
        form.reset({
            id: crypto.randomUUID(),
            type: "Comida",
            calories: 0,
            description: ""
        })

        dispatch({type: 'ADD_ACTIVITY', payload: values})
        
        if(values.type === 'Comida') addCaloriesConsumed(values.calories) 
        else if(values.type === 'Ejercicio') addCaloriesBurned(values.calories)

        alert('Datos almacenados correctamente')
    }

    function resetApp(){
        localStorage.clear()
        dispatch({ type : 'RESET_APP' })
        caloriesState.caloriesConsumed = 0
        caloriesState.caloriesBurned = 0
        alert('Se han borrado los datos correctamente')
    }

    return(
        <div className="flex flex-initial justify-center">
            <Button className="bg-blue-600 text-white mt-4" onClick={ () => resetApp() }>Reiniciar app</Button>
            <Card className="max-w-md min-w-md mt-4 border-0 shadow-white bg-gray-800 m-4">
                <CardHeader>
                    <CardTitle className="bg-violet-300 p-4 rounded-2xl text-center font-bold">
                        Registar datos caloricos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit = {form.handleSubmit(onSubmit)} className='space-y-8'>
                            <FormField
                                control={form.control}
                                name = "type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Tipo de registro</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-white border-0 w-[250px]">
                                                    <SelectValue placeholder='Selecciona un tipo de registro'/>
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Comida">Comidad (Calorías consumidas)</SelectItem>
                                                    <SelectItem value="Ejercicio">Ejercicio (Calorías quemadas)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name = "calories"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Calorías</FormLabel>
                                        <FormControl>
                                            <Input className="border-0 shadow-white bg-white" placeholder="Ingresa las calorías" {...field}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500 font-bold"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name = "description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Descripción de actividades o alimentos consumidos</FormLabel>
                                        <FormControl>
                                            <Textarea className="border-0 shadow-white bg-white" placeholder="Ingresa las actividades realizadas o los alimentos consumidos" {...field}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500 font-bold"/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col justify-center">
                                <Button type="submit" className="bg-green-500 text-amber-50">Registrar</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div >
                <Card className="mt-4 border-0 shadow-white bg-gray-800 max-w-md min-w-md">
                    <CardHeader>
                        <CardTitle className="bg-violet-300 p-4 rounded-2xl text-center font-bold">
                            Datos Registrados
                        </CardTitle>
                    </CardHeader>
                    <CardContent> 
                    <Tabs defaultValue="viewStadistics" className="w-dvw-lg">
                        <TabsList className="text-white bg-violet-300">
                            <TabsTrigger value="viewStadistics" className="bg-gray-800 mr-2">Estadisticas</TabsTrigger>
                            <TabsTrigger value="dates" className="bg-gray-800">Datos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="viewStadistics">
                            <div className="bg-amber-100 font-bold">
                                <Graphs/>
                            </div>
                        </TabsContent>
                        <TabsContent value="dates">    
                            <DynamicTable/>
                        </TabsContent>
                    </Tabs>
                    </CardContent>   
                </Card>
            </div>
        </div>
    )
}