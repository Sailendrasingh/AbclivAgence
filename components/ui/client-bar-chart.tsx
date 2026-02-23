"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function ClientBarChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div className="text-muted-foreground pt-10 text-center">Aucune activité</div>;

    return (
        <div className="w-full h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickMargin={10} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', backgroundColor: 'var(--background)' }} />
                    <Legend verticalAlign="bottom" height={36} />
                    <Bar dataKey="Créées" fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="Résolues" fill="#82ca9d" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
