import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mes)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.receipt.toLocaleString('pt-BR')}
            </span>
            {monthOrdersAmount.diffFromLastMonth > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthOrdersAmount.diffFromLastMonth}
                </span>{' '}
                em relação ao mês passado
              </p>
            )}
            {monthOrdersAmount.diffFromLastMonth < 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">
                  {monthOrdersAmount.diffFromLastMonth}
                </span>{' '}
                em relação ao mês passado
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
