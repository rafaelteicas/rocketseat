import defaultUserPhoto from '@assets/userPhotoDefault.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { HStack, VStack, Heading, Text, Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        mr={4}
        size={16}
        source={
          user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhoto
        }
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} color="gray.200" name="logout" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
