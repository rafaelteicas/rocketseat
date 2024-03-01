export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type OrderStatusProps = {
  status: OrderStatus
}
const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400 mr-2"></span>
      )}
      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
      )}
      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
      )}
      {status === 'processing' ||
        (status === 'delivering' && (
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
        ))}
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
