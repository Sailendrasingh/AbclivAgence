export default function DashboardLoading() {
    return (
        <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="h-80 bg-muted animate-pulse rounded-xl" />
                <div className="h-80 bg-muted animate-pulse rounded-xl" />
            </div>
        </div>
    )
}
