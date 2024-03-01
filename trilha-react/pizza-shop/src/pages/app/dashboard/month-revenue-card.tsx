import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthRevenue,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mes)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            {monthRevenue.diffFromLastMonth < 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthRevenue.diffFromLastMonth}
                </span>{' '}
                em relação ao mês passado
              </p>
            )}
            {monthRevenue.diffFromLastMonth > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}
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
