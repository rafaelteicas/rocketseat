import { Clock, CurrencyDollar, MapPin } from 'phosphor-react'
import { ItemContainer, SuccessCard, SuccessContainer } from './styles'
import { useCart } from '../../hooks/useCart'

export function Success() {
  const { order } = useCart()
  if (order) {
    return (
      <SuccessContainer>
        <div>
          <h1>Uhu! Pedido confirmado</h1>
          <p>Agora é só aguardar que logo o café chegará até você</p>
          <SuccessCard>
            <div className="content">
              <ItemContainer color="purple">
                <span>
                  <MapPin color="white" weight="fill" size={16} />
                </span>
                <div>
                  <p>
                    Entrega em{' '}
                    <b>
                      {order.street}, {order.number}
                    </b>
                  </p>
                  <p>
                    {order.neighborhood} - {order.city}, {order.uf}
                  </p>
                </div>
              </ItemContainer>
              <ItemContainer color="yellow-dark">
                <span>
                  <Clock color="white" weight="fill" size={16} />
                </span>
                <div>
                  <p>Previsão de entrega</p>
                  <b>20 min - 30 min </b>
                </div>
              </ItemContainer>
              <ItemContainer>
                <span>
                  <CurrencyDollar color="white" weight="fill" size={16} />
                </span>
                <div>
                  <p>Pagamento na entrega</p>
                  <b>{order.payment}</b>
                </div>
              </ItemContainer>
            </div>
          </SuccessCard>
        </div>
        <img src="/images/Illustration.png" alt="" />
      </SuccessContainer>
    )
  }
}
