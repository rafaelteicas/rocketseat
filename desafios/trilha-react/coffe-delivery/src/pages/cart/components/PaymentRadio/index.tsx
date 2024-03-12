import { Bank, CreditCard, Money } from 'phosphor-react'
import { PaymentButton, PaymentMethodContainer } from './styles'
import { Controller, useFormContext } from 'react-hook-form'
import { FormType } from '../..'

export function PaymentRadio() {
  const { control } = useFormContext<FormType>()
  return (
    <Controller
      name="payment"
      control={control}
      render={({ field }) => (
        <PaymentMethodContainer onValueChange={field.onChange}>
          <PaymentButton value="Crédito">
            <CreditCard size={16} />
            Cartão de Crédito
          </PaymentButton>
          <PaymentButton value="Débito">
            <Bank size={16} />
            Cartão de Débito
          </PaymentButton>
          <PaymentButton value="Dinheiro">
            <Money size={16} />
            Dinheiro
          </PaymentButton>
        </PaymentMethodContainer>
      )}
    />
  )
}
