import { api } from '@/lib/axios'

interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

type GetDataRevenueInPeriod = {
  date: string
  receipt: string
}[]

export async function getDailyRevenuePeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDataRevenueInPeriod>(
    `/metrics/daily-receipt-in-period`,
    { params: { from, to } },
  )
  return response.data
}
