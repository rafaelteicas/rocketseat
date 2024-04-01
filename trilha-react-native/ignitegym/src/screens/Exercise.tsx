import BodySvg from '@assets/body.svg';
import RepetitionsSVG from '@assets/repetitions.svg';
import SeriesSVG from '@assets/series.svg';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Feather } from '@expo/vector-icons';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function Exercise({ navigation, route }: AppNavigatorRoutesProps<'exercise'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const exerciseId = route.params.exerciseId;

  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post('/history', {
        exercise_id: exerciseId,
      });
      toast.show({
        title: 'Histórico cadastrado com sucesso',
        placement: 'top',
        bgColor: 'green.700',
      });
      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício, tente novamente mais tarde';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício, tente novamente mais tarde';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} size={6} name="arrow-left" color="green.500" />
        </TouchableOpacity>
        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading fontFamily="heading" color="gray.100" fontSize="lg" flexShrink={1}>
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.100" textTransform="capitalize" ml={1}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="exercicio"
                resizeMode="cover"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                <HStack>
                  <SeriesSVG />
                  <Text color="gray.200" textTransform="capitalize" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSVG />
                  <Text color="gray.200" textTransform="capitalize" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                onPress={handleExerciseHistoryRegister}
                title="Marcar como realizado"
                isLoading={sendingRegister}
              />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
