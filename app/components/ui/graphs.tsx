'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"
import type { ChartConfig } from './chart'
import { useContext } from 'react'
import { Context } from '~/contexts/calorieContext'

const chartConfig = {
    quemadas: {
        label: "Calorías quemadas: ",
        color: "#F44336",
    },
    consumidas: {
        label: "Calorías consumidas: ",
        color: "#FF9800",
    }
} satisfies ChartConfig;

export function Graphs() {
    
    const {caloriesState} = useContext(Context)

    const chartData = [
        { calorias: "Registro calorico", quemadas: caloriesState.caloriesBurned, consumidas: caloriesState.caloriesConsumed }
    ];

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={true} />
                <XAxis
                    dataKey="calorias"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tick={{fontSize:16}}
                />
                <ChartTooltip content={<ChartTooltipContent className="text-lg bg-white" />} />
                <Bar dataKey="quemadas" fill="var(--color-quemadas)" />
                <Bar dataKey="consumidas" fill="var(--color-consumidas)" />
            </BarChart>
        </ChartContainer>
    );
}