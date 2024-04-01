import defaultUserPhoto from '@assets/userPhotoDefault.png';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { object, string, ref, InferType } from 'yup';

const PHOTO_SIZE = 33;

const profileSchema = object({
  name: string().required('Name is required'),
  email: string(),
  old_password: string(),
  password: string()
    .nullable()
    .transform((value) => (value ? value : null)),
  password_confirm: string()
    .nullable()
    .transform((value) => (value ? value : null))
    .oneOf([ref('password')], 'Confirm password'),
});

type FormDataProps = InferType<typeof profileSchema>;

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const { show } = useToast();
  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      updateUserProfile(userUpdated);
      await api.put('/users', data);
      show({
        title: 'Perfil atualizado com sucesso',
        bgColor: 'green.700',
        placement: 'top',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível';
      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (photoSelected.canceled) {
        return null;
      }

      const selectedPhoto = photoSelected.assets[0].uri;

      if (selectedPhoto) {
        const photoInfo = await FileSystem.getInfoAsync(selectedPhoto);
        //@ts-ignore
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bg: 'red.500',
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(' ').pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;
        updateUserProfile(userUpdated);

        show({
          title: 'Foto atualizada com sucesso',
          bgColor: 'green.700',
          placement: 'top',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton size={PHOTO_SIZE} rounded="full" startColor="gray.500" endColor="gray.400" />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhoto
              }
              alt="Foto"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Nome"
                bg="gray.600"
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Email"
                bg="gray.600"
                isDisabled
              />
            )}
          />
          <Heading
            fontFamily="heading"
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                placeholder="Senha antiga"
                bg="gray.600"
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                placeholder="Confirmar nova senha"
                bg="gray.600"
                secureTextEntry
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
