import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme['base-input']};
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px ${(props) => props.theme['base-button']};

  input {
    background: transparent;
    border: none;
    display: flex;
    flex: 1;
    font-size: 0.875rem;
    padding: 0.75rem;
    border-radius: 4px;
    color: ${(props) => props.theme['base-text']};
    overflow: hidden;
  }
`
