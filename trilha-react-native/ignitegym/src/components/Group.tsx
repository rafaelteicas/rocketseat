import { Pressable, Text, IPressableProps } from 'native-base';
import React from 'react';

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
      {...rest}>
      <Text fontSize="xs" color={isActive ? 'green.500' : 'gray.200'} textTransform="uppercase">
        {name}
      </Text>
    </Pressable>
  );
}
