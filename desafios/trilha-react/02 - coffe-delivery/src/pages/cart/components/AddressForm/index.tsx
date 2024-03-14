import { useFormContext } from 'react-hook-form'
import { AddressFormContainer } from './styles'
import { FormType } from '../..'
import { Input } from '../../../../components/input'

export function AddressForm() {
  const { register } = useFormContext<FormType>()
  return (
    <AddressFormContainer>
      <Input
        placeholder="CEP"
        type="number"
        {...register('cep', { valueAsNumber: true })}
      />
      <Input placeholder="Rua" {...register('street')} />
      <div className="address1">
        <Input
          placeholder="Número"
          type="number"
          {...register('number', { valueAsNumber: true })}
        />
        <Input placeholder="Complemento" {...register('complement')} />
      </div>
      <div className="address2">
        <Input placeholder="Bairro" {...register('neighborhood')} />
        <Input placeholder="Cidade" {...register('city')} />
        <Input
          placeholder="UF"
          maxLength={2}
          style={{
            textTransform: 'uppercase',
          }}
          {...register('uf')}
        />
      </div>
    </AddressFormContainer>
  )
}
