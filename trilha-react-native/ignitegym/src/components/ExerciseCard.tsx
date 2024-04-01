import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Entypo } from '@expo/vector-icons';
import { api } from '@services/api';
import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
          alt="Image"
        />
        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="lg" color="white">
            {data.name}
          </Heading>
          <Text numberOfLines={2} fontSize="sm" color="gray.200" mt={1}>
            {data.series} séries {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
