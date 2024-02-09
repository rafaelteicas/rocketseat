import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function DayOrdersAmountCard() {
  const { data: daysOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {daysOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {daysOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            {daysOrdersAmount.diffFromYesterday > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                  {daysOrdersAmount.diffFromYesterday}
                </span>{' '}
                em relação a ontem
              </p>
            )}
            {daysOrdersAmount.diffFromYesterday < 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">
                  {daysOrdersAmount.diffFromYesterday}
                </span>{' '}
                em relação a ontem
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
