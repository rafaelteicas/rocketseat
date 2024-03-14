import { CurrencyDollar, MapPin } from 'phosphor-react'
import { HeaderContainer, CartBox, CartContainer } from './styles'
import { CartItems } from './components/CartItems'
import { PaymentRadio } from './components/PaymentRadio'
import { useCart } from '../../hooks/useCart'
import { ConfirmButton } from './components/CartItems/styles'
import { AddressForm } from './components/AddressForm'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { useNavigate } from 'react-router-dom'

const SHIPPING_VALUE = 10

const formSchema = zod.object({
  cep: zod.number(),
  street: zod.string(),
  number: zod.number(),
  complement: zod.string(),
  city: zod.string(),
  neighborhood: zod.string(),
  uf: zod.string(),
  payment: zod.string(),
})

export type FormType = zod.infer<typeof formSchema>

export function Cart() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit } = form

  const { items, confirmOrder } = useCart()

  const cartTotal = items.reduce(
    (value, item) => {
      const totalValue = (value.totalValue += item.price * item.quantity)
      return {
        totalValue,
        quantity: item.quantity,
      }
    },
    {
      totalValue: 0,
      quantity: 0,
    },
  )

  const navigate = useNavigate()

  function handleCreateOrder(data: FormType) {
    confirmOrder({
      city: data.city,
      neighborhood: data.neighborhood,
      number: data.number,
      street: data.street,
      uf: data.uf,
      payment: data.payment,
    })
    navigate('/success')
  }

  return (
    <FormProvider {...form}>
      <CartContainer onSubmit={handleSubmit(handleCreateOrder)}>
        <div>
          <h2>Complete seu pedido</h2>
          <CartBox>
            <HeaderContainer>
              <MapPin size={22} />
              <div>
                <h4>Endereço de entrega</h4>
                <p>Informe o endereço onde deseja receber seu pedido</p>
              </div>
            </HeaderContainer>
            <AddressForm />
          </CartBox>

          <CartBox>
            <HeaderContainer color="purple">
              <CurrencyDollar size={22} />
              <div>
                <h4>Pagamento</h4>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </HeaderContainer>
            <PaymentRadio />
          </CartBox>
        </div>

        <div>
          <h2>Cafés selecionados</h2>
          <CartBox totalBox>
            {items.map(({ id, quantity }) => (
              <CartItems id={id} quantity={quantity} key={id} />
            ))}
            <table>
              <tr>
                <th>Total de itens</th>
                <td>{items.length}</td>
              </tr>
              <tr>
                <th>Entrega</th>
                <td>
                  {SHIPPING_VALUE.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <td>
                  {(cartTotal.totalValue + SHIPPING_VALUE).toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    },
                  )}
                </td>
              </tr>
            </table>
            <ConfirmButton type="submit">Confirmar Pedido</ConfirmButton>
          </CartBox>
        </div>
      </CartContainer>
    </FormProvider>
  )
}
