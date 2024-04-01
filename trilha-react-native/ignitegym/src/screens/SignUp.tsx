import Background from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(6, 'Min 6'),
  password_confirm: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Confirm password'),
});

export function SignUp({ navigation }: AuthNavigatorRoutesProps<'signUp'>) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post('/users', { name, email, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta, tente novamente mais tarde';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image
          source={Background}
          defaultSource={Background}
          alt="Background Image"
          resizeMode="contain"
          position="absolute"
        />
        <Center my="24">
          <Logo />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                errorMessage={errors.name?.message}
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                errorMessage={errors.email?.message}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>
        <Button title="Voltar para login" variant="outline" mt={12} onPress={navigation.goBack} />
      </VStack>
    </ScrollView>
  );
}
