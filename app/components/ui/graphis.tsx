'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import type { ChartConfig } from './chart';
import useCalorie from '../../hooks/useCalorie'; // Importa el hook

const chartConfig = {
    quemadas: {
        label: "Calorías quemadas",
        color: "#F44336",
    },
    consumidas: {
        label: "Calorías consumidas",
        color: "#FF9800",
    }
} satisfies ChartConfig;

export function Graphs() {
    
    const { caloriesBurned, caloriesConsumed } = useCalorie(); // Usa el hook

    const chartData = [
        { calorias: "Registro calorico", quemadas: caloriesBurned, consumidas: caloriesConsumed },
    ];

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="calorias"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quemadas" fill="var(--color-quemadas)" />
                <Bar dataKey="consumidas" fill="var(--color-consumidas)" />
            </BarChart>
        </ChartContainer>
    );
}