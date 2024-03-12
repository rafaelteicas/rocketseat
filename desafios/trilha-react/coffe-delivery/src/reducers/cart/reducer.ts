import { Item } from '@radix-ui/react-radio-group'
import { Action, ActionsTypes } from './actions'

export interface Item {
  id: number
  quantity: number
  price: number
}

export function reducer(state: Item[], action: Action) {
  switch (action.type) {
    case ActionsTypes.ADD_ITEM: {
      const alreadyExits = state.find(
        (item) => item.id === action.payload.item.id,
      )
      if (alreadyExits) {
        return state.map((item) => {
          const itemToIncrement = item.id === action.payload.item.id
          if (itemToIncrement) {
            return {
              ...item,
              quantity: item.quantity + action.payload.item.quantity,
            }
          }
          return item
        })
      } else {
        return [...state, action.payload.item]
      }
    }
    case ActionsTypes.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.itemId)
    case ActionsTypes.INCREMENT_ITEM_QUANTITY:
      return state.map((item) => {
        const itemToIncrement = item.id === action.payload.itemId
        if (itemToIncrement) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
    case ActionsTypes.DECREMENT_ITEM_QUANTITY:
      return state.map((item) => {
        const itemToIncrement = item.id === action.payload.itemId
        if (itemToIncrement) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
        }
        return item
      })
  }
}
