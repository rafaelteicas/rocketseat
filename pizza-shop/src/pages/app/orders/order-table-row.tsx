import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableRow, TableCell } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'

export default function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes dos </span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        fdsdlfksld;fjksdlf
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-slate-400 mr-2"></span>
          <span className="text-muted-foreground font-medium">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Rafael</TableCell>
      <TableCell className="font-medium">R$199,99</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="h-3 w-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
