import { styled } from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const PaymentButton = styled(RadioGroup.Item)`
  background: ${(props) => props.theme['base-button']};
  padding: 1rem;
  font-size: 0.75rem;
  border: none;
  text-transform: uppercase;
  color: ${(props) => props.theme['base-text']};
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${(props) => props.theme.purple};
  }

  &[data-state='checked'] {
    background: ${(props) => props.theme['purple-light']};
    box-shadow: 0 0 0 2px ${(props) => props.theme.purple};
  }
`

export const PaymentMethodContainer = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  @media (max-width: 1280px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
  }
`
