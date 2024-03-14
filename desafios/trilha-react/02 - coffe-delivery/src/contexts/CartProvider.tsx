import { createContext, useEffect, useReducer, useState } from 'react'
import { Item, reducer } from '../reducers/cart/reducer'
import { ActionsTypes } from '../reducers/cart/actions'

interface Order {
  number: number
  street: string
  city: string
  neighborhood: string
  uf: string
  payment: string
}

interface CartContextType {
  items: Item[]
  order: Order | null
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
  confirmOrder: (order: Order) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [cartState, dispatch] = useReducer(reducer, [], (cartState) => {
    const localStore = localStorage.getItem('@cart-store')
    if (localStore) {
      return JSON.parse(localStore)
    }
    return cartState
  })

  useEffect(() => {
    if (cartState) {
      localStorage.setItem('@cart-store', JSON.stringify(cartState))
    }
  }, [cartState])

  function addItem(item: Item) {
    dispatch({
      type: ActionsTypes.ADD_ITEM,
      payload: {
        item,
      },
    })
  }

  function removeItem(itemId: number) {
    dispatch({
      type: ActionsTypes.REMOVE_ITEM,
      payload: {
        itemId,
      },
    })
  }

  function incrementItemQuantity(itemId: number) {
    dispatch({
      type: ActionsTypes.INCREMENT_ITEM_QUANTITY,
      payload: {
        itemId,
      },
    })
  }

  function decrementItemQuantity(itemId: number) {
    dispatch({
      type: ActionsTypes.DECREMENT_ITEM_QUANTITY,
      payload: {
        itemId,
      },
    })
  }

  function confirmOrder(order: Order) {
    setOrder(order)
  }

  const items = cartState

  return (
    <CartContext.Provider
      value={{
        items,
        order,
        addItem,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
