import { getMonthCanceledOrdersAmount } from '@/api/get-month-calceled-orders-amount'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (dia)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.receipt.toLocaleString('pt-BR')}
            </span>
            {monthCanceledOrdersAmount.diffFromLastMonth < 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}
                </span>{' '}
                em relação ao mês passado
              </p>
            )}
            {monthCanceledOrdersAmount.diffFromLastMonth > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}
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
