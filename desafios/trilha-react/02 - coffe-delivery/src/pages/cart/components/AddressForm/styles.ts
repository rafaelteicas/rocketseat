import styled from 'styled-components'

export const AddressFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  [class='address1'] {
    display: grid;
    grid-template-columns: 20% calc(80% - 1rem);
    gap: 1rem;
  }

  [class='address2'] {
    display: grid;
    grid-template-columns: 30% calc(60% - 1rem) calc(10% - 1rem);
    gap: 1rem;
    @media (max-width: 1280px) {
      display: flex;
      flex-direction: column;
    }
  }

  input[type='number'],
  input[type='number'] {
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
