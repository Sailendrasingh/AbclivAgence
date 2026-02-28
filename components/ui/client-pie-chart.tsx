"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function ClientPieChart({ data, colors }: { data: any[], colors: Record<string, string> }) {
    if (!data || data.length === 0) return <div className="text-muted-foreground pt-10 text-center">Aucune donnée</div>;

    return (
        <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[entry.name] || "#ccc"} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any, name: any) => [value, `État ${name}`]}
                        contentStyle={{
                            borderRadius: '8px',
                            backgroundColor: 'hsl(var(--chart-tooltip-bg))',
                            color: 'hsl(var(--chart-tooltip-fg))',
                            border: '1px solid hsl(var(--border))'
                        }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
