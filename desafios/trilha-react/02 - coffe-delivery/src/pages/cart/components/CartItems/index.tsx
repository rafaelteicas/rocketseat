import { Minus, Plus, Trash } from 'phosphor-react'
import {
  Actions,
  CartItemsContainer,
  ItemInfo,
  Remove,
  Selector,
  Separator,
} from './styles'
import { coffees } from '../../../../data/coffees'
import { useCart } from '../../../../hooks/useCart'

interface CartItemsProps {
  id: number
  quantity: number
}

export function CartItems({ id, quantity }: CartItemsProps) {
  const { removeItem, incrementItemQuantity, decrementItemQuantity } = useCart()
  const cartItem = coffees.filter((coffee) => coffee.id === id)

  function handleRemoveItem() {
    removeItem(id)
  }

  function handleIncrementItemQuantity() {
    incrementItemQuantity(id)
  }

  function handleDecrementItemQuantity() {
    decrementItemQuantity(id)
  }

  return (
    <>
      <CartItemsContainer>
        <img src={cartItem[0].image} alt="" width={64} height={64} />
        <div>
          <ItemInfo>
            <p>Expresso Tradicional</p>
            <p>
              {cartItem[0].price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </ItemInfo>
          <Actions>
            <Selector>
              <Plus weight="bold" onClick={handleIncrementItemQuantity} />
              <p>{quantity}</p>
              <Minus weight="bold" onClick={handleDecrementItemQuantity} />
            </Selector>
            <Remove onClick={handleRemoveItem}>
              <Trash size={16} />
              REMOVER
            </Remove>
          </Actions>
        </div>
      </CartItemsContainer>
      <Separator />
    </>
  )
}
