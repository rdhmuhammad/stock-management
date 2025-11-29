import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig} from "@/components/ui/chart.tsx";
import {Line, LineChart, XAxis, YAxis, CartesianGrid} from "recharts";

// Sample data for the winrate graph
const chartData = [
    { month: "Jan", winrate: 65, trades: 20 },
    { month: "Feb", winrate: 72, trades: 25 },
    { month: "Mar", winrate: 58, trades: 18 },
    { month: "Apr", winrate: 80, trades: 30 },
    { month: "May", winrate: 75, trades: 28 },
    { month: "Jun", winrate: 82, trades: 32 },
];

// Chart configuration - defines the colors and labels for your data
const chartConfig = {
    winrate: {
        label: "Win Rate %",
        color: "hsl(var(--chart-1))",
    },
    trades: {
        label: "Total Trades",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export const WinrateGraph: React.FC = ()=>{
    return(
        <Card className='col-span-1'>
            <CardHeader>
                <CardTitle>Winrate Graph</CardTitle>
            </CardHeader>
            <CardContent className='h-[320px]'>
                <ChartContainer config={chartConfig}>
                    <LineChart data={chartData}  style={{height: '330px', width: '100%'}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="winrate"
                            stroke="#e11d48"
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="trades"
                            stroke="#cccf08"
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}