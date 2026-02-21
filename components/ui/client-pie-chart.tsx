"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function ClientPieChart({ data, colors }: { data: any[], colors: Record<string, string> }) {
    if (!data || data.length === 0) return <div className="text-muted-foreground pt-10 text-center">Aucune donnée</div>;

    return (
        <div className="w-full flex justify-center items-center h-[280px]">
            <PieChart width={350} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[entry.name] || "#ccc"} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: any, name: any) => [value, `État ${name}`]}
                    contentStyle={{ borderRadius: '8px', backgroundColor: 'var(--background)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </div>
    )
}
