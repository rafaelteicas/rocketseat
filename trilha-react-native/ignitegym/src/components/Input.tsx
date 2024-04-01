import { IInputProps, Input as NativeBaseInput, FormControl } from 'native-base';
import React from 'react';

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...props }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        p={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        isInvalid={invalid}
        placeholderTextColor="gray.300"
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...props}
      />
      <FormControl.ErrorMessage
        _text={{
          color: 'red.500',
        }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
