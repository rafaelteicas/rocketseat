import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function MonthOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mes)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">12393 pedidos</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            +2 pedidos
          </span>{' '}
          em relação ao mes passado
        </p>
      </CardContent>
    </Card>
  )
}
