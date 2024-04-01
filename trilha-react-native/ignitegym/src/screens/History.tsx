import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryDayDTO } from '@dtos/HistoryByDayDTO';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Heading, SectionList, Text, VStack, useToast } from 'native-base';
import React, { useCallback, useState } from 'react';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      setExercises(response.data);
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

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          px={8}
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard {...item} />}
          renderSectionHeader={({ section }) => (
            <Heading fontFamily="heading" color="gray.200" fontSize="md" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 1,
              justifyContent: 'center',
            }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              {`Não há exercícios registrados ainda.\nVamos fazer exercícios hoje?`}
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
