import {
  Actions,
  CardContainer,
  CartActions,
  CartContent,
  Price,
  Selector,
} from './styles'
import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { CoffeeType } from '../../data/coffees'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'

interface CardProps {
  coffee: CoffeeType
}

export function Card({ coffee }: CardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  function handleIncrementCart() {
    setQuantity((prev) => prev + 1)
  }

  function handleDecrementCard() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  function handleAddToCart() {
    addItem({ id: coffee.id, quantity, price: coffee.price })
  }

  return (
    <CardContainer>
      <CartContent>
        <img src={coffee.image} alt="café" />
        <div style={{ display: 'flex', gap: 10, marginTop: '2rem' }}>
          {coffee.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <h3>{coffee.title}</h3>
        <p>{coffee.subtitle}</p>
      </CartContent>
      <CartActions>
        <Price>
          <p>R$</p>
          <h1>{parseFloat(coffee.price.toString()).toFixed(2)}</h1>
        </Price>
        <Actions>
          <Selector>
            <Plus weight="bold" onClick={handleIncrementCart} />
            <p>{quantity}</p>
            <Minus weight="bold" onClick={handleDecrementCard} />
          </Selector>
          <button onClick={handleAddToCart}>
            <ShoppingCart weight="fill" color="white" size={19} />
          </button>
        </Actions>
      </CartActions>
    </CardContainer>
  )
}
