import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (dia)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          1 cancelamento
        </span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-2%</span>
          em relação ao mes passado
        </p>
      </CardContent>
    </Card>
  )
}
