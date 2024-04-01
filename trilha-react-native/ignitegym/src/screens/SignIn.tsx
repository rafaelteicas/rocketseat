import Background from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';

type FormData = {
  email: string;
  password: string;
};

const signInSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export function SignIn({ navigation }: AuthNavigatorRoutesProps<'signIn'>) {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const { signIn } = useAuth();

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível fazer login';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
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
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
        </Center>
        <Button
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
          isLoading={isLoading}
        />
      </VStack>
    </ScrollView>
  );
}
