import { HistoryDTO } from '@dtos/HistoryDTO';
import { HStack, Heading, Text, VStack } from 'native-base';
import React from 'react';

export function HistoryCard(data: HistoryDTO) {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between">
      <VStack mr={5} flex={1}>
        <Heading fontFamily="heading" color="white" fontSize="md" textTransform="capitalize">
          {data.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  );
}
